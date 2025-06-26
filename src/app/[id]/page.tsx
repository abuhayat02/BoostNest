"use client";

import ServiceDetails from "@/components/ServiceDetails";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BuyService() {
  const [info, setInfo] = useState<any>({});
  const params = useParams();
  const id = params?.id as string;
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3000/api/services/${id}`);
        const data = await res.json();
        setInfo(data?.service);
      } catch (e: any) {
        console.error("Fetch error:", e.message);
      }
    }
    if (id) fetchData();
  }, [id]);

  return (
    <div className="p-6">
      {info?.title && (
        <ServiceDetails
          _id={info._id}
          title={info.title}
          subtitle={info.subtitle}
          category={info.category}
          description={info.description}
          price={info.price}
          deliveryTime={info.deliveryTime}
          thumbnail={info.thumbnail}
          feature={info.feature || []}
        />
      )}
    </div>
  );
}
