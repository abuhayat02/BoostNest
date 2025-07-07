import OrderForm from "@/components/Order";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BuyNowPage({ params }: Props) {
  const { id } = await params;
  return (
    <div className="text-white">
      <div className="container mx-auto text-white">
        {/* Notice */}
        <div className="p-4 border border-yellow-500   text-xs text-gray-800 dark:text-gray-100 max-w-2xl mx-auto">
          <strong>🔔 নোটিশ (Notice):</strong><br />
          ১. যে নাম্বার থেকে পেমেন্ট করেছেন, সেটি <strong>Description ফিল্ডে</strong> অবশ্যই লিখুন।<br />
          ২. স্ক্রিনশটে যেন <strong>সময় ও ট্রানজেকশন তথ্য</strong> স্পষ্টভাবে দেখা যায়।
        </div>

        <OrderForm servicesId={id} />
      </div>
    </div>
  );
}


