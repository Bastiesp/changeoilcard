import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface OilChangeFormProps {
  onSubmit: (data: { cliente: string; vehiculo: string; placa: string; kilometraje: number }) => void;
}

export const OilChangeForm: React.FC<OilChangeFormProps> = ({ onSubmit }) => {
  const [cliente, setCliente] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [placa, setPlaca] = useState("");
  const [kilometraje, setKilometraje] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cliente || !vehiculo || !placa || !kilometraje) return;
    onSubmit({ cliente, vehiculo, placa, kilometraje: Number(kilometraje) });
    setCliente(""); setVehiculo(""); setPlaca(""); setKilometraje("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <Input placeholder="Cliente" value={cliente} onChange={e => setCliente(e.target.value)} />
      <Input placeholder="Vehículo" value={vehiculo} onChange={e => setVehiculo(e.target.value)} />
      <Input placeholder="Patente" value={placa} onChange={e => setPlaca(e.target.value)} />
      <Input placeholder="Kilometraje" type="number" value={kilometraje} onChange={e => setKilometraje(e.target.value)} />
      <Button type="submit" className="w-full">Agregar Cambio</Button>
    </form>
  );
};
