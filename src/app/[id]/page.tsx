"use client";

import ServiceDetails from "@/components/ServiceDetails";
import { use, useEffect, useState } from "react";

interface Params {
  params: {
    id: string;
  };
}

export default function BuyService({ params }: Params) {
  const [info, setInfo] = useState<any>({});
  const { id } = use(params);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/services/${id}`);
        const data = await res.json();
        setInfo(data?.service);
      } catch (e: any) {
        console.error("Fetch error:", e.message);
      }
    }
    fetchData();
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
