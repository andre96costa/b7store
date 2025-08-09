import { Banners } from "@/components/home/banners";
import { data } from "@/data";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <Banners list={data.banners} />
      <div className="flex flex-col gap-4 mt-6 md:flex-row md:gap-8 md:mt-12">

        <div className="flex flex-1 py-6 border border-gray-200 rounded-sm">
          <div className="w-32 border-r border-gray-200 flex justify-center items-center">
            <Image src={'/assets/ui/truck-line.png'} alt="" width={40} height={40} />
          </div>
          <div className="flex-1 pl-8">
            <div className="font-bold text-xl">Frete Grátis</div>
            <div className="text-gray-500">Para todo o Nordeste.</div>
          </div>
        </div>

        <div className="flex flex-1 py-6 border border-gray-200 rounded-sm">
          <div className="w-32 border-r border-gray-200 flex justify-center items-center">
            <Image src={'/assets/ui/discount-percent-line.png'} alt="" width={40} height={40} />
          </div>
          <div className="flex-1 pl-8">
            <div className="font-bold text-xl">Muitas Ofertas</div>
            <div className="text-gray-500">Ofertas imbátiveis</div>
          </div>
        </div>

        <div className="flex flex-1 py-6 border border-gray-200 rounded-sm">
          <div className="w-32 border-r border-gray-200 flex justify-center items-center">
            <Image src={'/assets/ui/arrow-left-right-line.png'} alt="" width={40} height={40} />
          </div>
          <div className="flex-1 pl-8">
            <div className="font-bold text-xl">Troca Fácil</div>
            <div className="text-gray-500">No período de 30 dias.</div>
          </div>
        </div>

      </div>
    </div>
  )
}