import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <Label htmlFor="placa">Placa</Label>
        <Input id="placa" placeholder="Ingrese la placa" />

        <Button className="mt-4 w-full">
          Guardar Servicio
        </Button>
      </Card>
    </div>
  );
}

export default App;
