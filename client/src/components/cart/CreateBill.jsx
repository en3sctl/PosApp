import React from "react";
import { Button, Card, Form, Input, message, Modal, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../redux/cartSlice";

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill",
        {
          method: "POST",
          body: JSON.stringify({
            ...values,
            subTotal: cart.total,
            tax: ((cart.total * cart.tax) / 100).toFixed(2),
            totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(
              2
            ),
            cartItems: cart.cartItems,
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );

      if (res.status === 200) {
        message.success("Invoice created successfully.");
        dispatch(reset());
        navigate("/bills");
      }
    } catch (error) {
      message.danger("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <Modal
      title="Create Invoice"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form layout={"vertical"} onFinish={onFinish}>
        <Form.Item
          label="Customer Name"
          name={"customerName"}
          rules={[
            {
              required: true,
              message: "Username is required",
            },
          ]}
        >
          <Input placeholder="Write a Customer Name" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name={"customerPhoneNumber"}
          label="Phone Number"
        >
          <Input placeholder="Write a Phone Number" maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Payment method"
          rules={[{ required: true }]}
          name={"paymentMode"}
        >
          <Select placeholder="Select a Payment Method">
            <Select.Option value="Cash">Cash</Select.Option>
            <Select.Option value="Credit Card">Credit Card</Select.Option>
          </Select>
        </Form.Item>
        <Card>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}zł</span>
          </div>
          <div className="flex justify-between my-2">
            <span>TAX %{cart.tax}</span>
            <span className="text-red-600">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              zł
            </span>
          </div>
          <div className="flex justify-between">
            <b>Grand Total</b>
            <b>
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              zł
            </b>
          </div>
          <div className="flex justify-end">
            <Button
              className="mt-4"
              type="primary"
              onClick={() => setIsModalOpen(true)}
              htmlType="submit"
              disabled={cart.cartItems.length === 0}
            >
              Create Order
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateBill;
