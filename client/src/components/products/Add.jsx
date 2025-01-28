import React from "react";
import { Button, Form, Input, message, Modal, Select } from "antd";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  products,
  setProducts,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Item added successfully.");
      form.resetFields();
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Add new item"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name="title"
          label="Item name"
          rules={[
            { required: true, message: "Product Name Field Cannot Be Empty!" },
          ]}
        >
          <Input placeholder="Enter product name." />
        </Form.Item>
        <Form.Item
          name="img"
          label="Product Image"
          rules={[
            { required: true, message: "Product Image Field Cannot Be Empty!" },
          ]}
        >
          <Input placeholder="Enter product image." />
        </Form.Item>
        <Form.Item
          name="price"
          label="Item price"
          rules={[
            { required: true, message: "Product Price Field Cannot Be Empty!" },
          ]}
        >
          <Input placeholder="Enter the product price." />
        </Form.Item>
        <Form.Item
          name="category"
          label="Select Category"
          rules={[
            { required: true, message: "Category Field Cannot Be Empty!" },
          ]}
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.title ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categories}
          />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
