import { Address } from "@/types/address";
import { ChangeEvent, FormEvent, startTransition, useState, useTransition } from "react";
import z from "zod";

const schema = z.object({
    zipcode: z.string().min(1, 'CEP é obrigatporio'),
    street: z.string().min(1, 'Rua é obrigatporio'),
    number: z.string().min(1, 'Numero é obrigatporio'),
    city: z.string().min(1, 'Cidade é obrigatporio'),
    state: z.string().min(1, 'Estado é obrigatporio'),
    country: z.string().min(1, 'Pais é obrigatporio'),
    complement: z.string().optional()
})

type Props = {
    open: boolean;
    onClose: () => void;
    onAdd: (address: Address) => Promise<void>
}

export const AddressModal = ({ open, onClose, onAdd }: Props) => {
    let emptyAddress: Address = {
        zipcode: '',
        street: '',
        number: '',
        city: '',
        state: '',
        country: '',
        complement: ''
    }
    const [form, setForm] = useState<Address>(emptyAddress);
    const [error, setError] = useState('');
    const [pending, setTransition] = useTransition();

    if (!open) {
        return null;
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const result = schema.safeParse(form);
        if (!result.success) {
            setError(result.error.issues[0]?.message || 'Preencha todos os campos obrigatórios')
        }
        setError('');
        startTransition(async () => {
            try{
                await onAdd(form);
                setForm(emptyAddress)
            }catch(err: any) {
                setError(err?.message || 'Erro ao salvar o endereço')
            }
        })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm(form => ({...form, [e.target.name]: e.target.value }));
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black/90  z-50">
            <button disabled={pending} className="cursor-pointer absolute top-2 right-2 text-4xl text-white" onClick={onClose}>&times;</button>
            <div className="bg-white p-6 rounded w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Adicionar endereço</h2>
                <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2"
                >
                    <input type="text" 
                        name="zipcode" 
                        id="zipcode"
                        placeholder="Digite seu CEP"
                        onChange={handleChange}
                        disabled={pending}
                        value={form.zipcode}
                        className="border border-gray-200 px-3 py-2 rounded outline-0"
                    />

                    <input type="text" 
                        name="street" 
                        id="street"
                        placeholder="Digite seu RUA"
                        onChange={handleChange}
                        disabled={pending}
                        value={form.street}
                        className="border border-gray-200 px-3 py-2 rounded outline-0"
                    />

                    <input type="text" 
                        name="number" 
                        id="number"
                        placeholder="Digite seu numero"
                        onChange={handleChange}
                        disabled={pending}
                        value={form.number}
                        className="border border-gray-200 px-3 py-2 rounded outline-0"
                    />

                    <input type="text" 
                        name="city" 
                        id="city"
                        placeholder="Digite sua cidade"
                        onChange={handleChange}
                        disabled={pending}
                        value={form.city}
                        className="border border-gray-200 px-3 py-2 rounded outline-0"
                    />

                    <input type="text" 
                        name="state" 
                        id="state"
                        placeholder="Digite seu estado"
                        onChange={handleChange}
                        disabled={pending}
                        value={form.state}
                        className="border border-gray-200 px-3 py-2 rounded outline-0"
                    />

                    <input type="text" 
                        name="country" 
                        id="country"
                        placeholder="Digite seu pais"
                        onChange={handleChange}
                        disabled={pending}
                        value={form.country}
                        className="border border-gray-200 px-3 py-2 rounded outline-0"
                    />

                    <input type="text" 
                        name="complement" 
                        id="complement"
                        placeholder="Digite seu complemento"
                        onChange={handleChange}
                        disabled={pending}
                        value={form.complement}
                        className="border border-gray-200 px-3 py-2 rounded outline-0"
                    />
                    <button type="submit" className="bg-blue-600 text-white p-4 rounded-sm" disabled={pending}>
                        {pending ? "Salvando" : "Adicionar"}
                    </button>
                </form>
            </div>
        </div>
    )
}