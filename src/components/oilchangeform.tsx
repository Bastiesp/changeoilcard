import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { OilChange } from "./oilchangecard";

interface OilChangeFormProps {
  onSubmit: (data: OilChange) => void;
}

export const OilChangeForm: React.FC<OilChangeFormProps> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    cliente: "",
    vehiculo: "",
    placa: "",
    kilometraje: "",
    proximoCambio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOilChange: OilChange = {
      id: crypto.randomUUID(),
      cliente: formData.cliente,
      vehiculo: formData.vehiculo,
      placa: formData.placa,
      kilometraje: Number(formData.kilometraje),
      fecha: new Date().toLocaleDateString(),
      proximoCambio: Number(formData.proximoCambio),
    };

    onSubmit(newOilChange);

    setFormData({
      cliente: "",
      vehiculo: "",
      placa: "",
      kilometraje: "",
      proximoCambio: "",
    });
  };

  return (
    <Card className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">
        Registrar Cambio de Aceite
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="cliente">Cliente</Label>
          <Input
            name="cliente"
            value={formData.cliente}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="vehiculo">Vehículo</Label>
          <Input
            name="vehiculo"
            value={formData.vehiculo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="placa">Placa</Label>
          <Input
            name="placa"
            value={formData.placa}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="kilometraje">Kilometraje Actual</Label>
          <Input
            type="number"
            name="kilometraje"
            value={formData.kilometraje}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Label htmlFor="proximoCambio">Próximo Cambio (km)</Label>
          <Input
            type="number"
            name="proximoCambio"
            value={formData.proximoCambio}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Guardar
        </Button>
      </form>
    </Card>
  );
};
