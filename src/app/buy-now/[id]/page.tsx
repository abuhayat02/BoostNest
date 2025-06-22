import UploadImageForm from "@/components/Order";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

function PaymentRequest({ params }: Props) {
  const { id } = params;

  return (
    <div className="container mx-auto text-white">
      {/* Notice */}
      <div className="p-4 border border-yellow-500 rounded-md  text-sm text-gray-800 dark:text-gray-100  max-w-2xl mx-auto">
        <strong>🔔 নোটিশ (Notice):</strong><br />
        ১. যে নাম্বার থেকে পেমেন্ট করেছেন, সেটি <strong>Description ফিল্ডে</strong> অবশ্যই লিখুন।<br />
        ২. স্ক্রিনশটে যেন <strong>সময় ও ট্রানজেকশন তথ্য</strong> স্পষ্টভাবে দেখা যায়।
      </div>
      <UploadImageForm params={{ servicesId: id }} ></UploadImageForm>
    </div>
  );
}

export default PaymentRequest;
