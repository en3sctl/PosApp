import React from 'react';
import { Button, Modal } from "antd";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintBill = ({ isModalOpen, setIsModalOpen, customer }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Modal
      title="Print Invoice"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      width={800}
    >
      <section className="py-20 bg-black" ref={componentRef}>
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <h2 className="text-4xl font-bold text-slate-700">PJATK</h2>
            </div>
            <div className="bill-details">
              <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Invoice Details:</p>
                  <p className="text-green-600">{customer?.customerName}</p>
                  <p> Fake Street 123</p>
                  <p> San Javier </p>
                  <p> CA 1234</p>
                </div>
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Invoice:</p>
                  The Boring Company
                  <p> Tesla Street 007</p>
                  <p> Frisco </p>
                  <p> CA 0000</p>
                </div>
                <div className="text-md text-slate-500">
                  <div>
                    <p className="font-bold text-slate-700">Invoice No:</p>
                    <p>000{Math.floor(Math.random() * 100)}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 mt-2">
                      Date of Issue:
                    </p>
                    <p>{customer?.createdAt.substring(0, 10)}</p>
                  </div>
                </div>
                <div className="text-md text-slate-500 sm:block hidden">
                  <div>
                    <p className="font-bold text-slate-700">Conditions:</p>
                    <p>10 Days</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 mt-2">Maturity:</p>
                    <p>2025-01-21</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bill-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Picture
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      {" "}
                      Title
                    </th>
                    <th
                      colSpan={4}
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:hidden"
                    >
                      {" "}
                      Title
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Piece
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-end text-sm font-normal text-slate-700 md:pl-0"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customer?.cartItems.map((item) => (
                    <tr className="border-b border-slate-200">
                      <td className="py-4 sm:table-cell hidden">
                        <img
                          src={item.img}
                          alt=""
                          className="w-12 h-12 object-cover"
                        />
                      </td>
                      <td className="py-4 sm:table-cell hidden">
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="sm:hidden inline-block text-xs">
                            Unit Price {item.price}zł
                          </span>
                        </div>
                      </td>
                      <td className="py-4 sm:hidden" colSpan={4}>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="sm:hidden inline-block text-xs">
                            Unit Price {item.price}zł
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-center sm:table-cell hidden">
                        <span>{item.price.toFixed(2)}₺</span>
                      </td>
                      <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                        <span>{item.quantity}</span>
                      </td>
                      <td className="py-4 text-end">
                        <span>{(item.price * item.quantity).toFixed(2)}zł</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        Subtotal
                      </span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4"
                    >
                      <p className="font-normal text-slate-700">Subtotal</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.subTotal}zł
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">TAX</span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4"
                    >
                      <p className="font-normal text-slate-700">TAX</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-red-600">
                        +{customer?.tax}
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        Grand Total
                      </span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      scope="row"
                      colSpan="4"
                    >
                      <p className="font-normal text-slate-700">Grand Total</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.totalAmount}zł
                      </span>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className="py-9">
                <div className="border-t pt-9 border-slate-200">
                  <p className="text-sm font-light text-slate-700">
                    Payment terms are 14 days. Please note that according to the
                    Late Payment of Unpackaged Debts Act 0000, freelancers have
                    the right to charge a late payment fee of 00.00 if arrears
                    are not paid after this period, at which point a new invoice
                    will be presented in addition to this fee. If the revised
                    invoice is not paid within 14 days, additional interest will
                    be applied to the overdue account and 8% legal rate plus
                    0.5% Bank of Poland base for a total of 8.5%. Parties cannot
                    make a contract outside the provisions of the Law.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button type="primary" size="large" onClick={handlePrint}>
          Print
        </Button>
      </div>
    </Modal>
  );
};

export default PrintBill;
