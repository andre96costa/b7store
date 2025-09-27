"use server"

type ShippingInfoResponse = {
    zipcode: string;
    cost: number;
    days: number;
}

export const getShippingInfo = async (zipcode:string): Promise<ShippingInfoResponse | false> => {
    return {
        zipcode: '12345',
        cost: 6,
        days: 3
    };
}