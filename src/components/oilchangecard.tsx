import { OilChange } from "../types";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { generatePDF } from "../lib/utils";

interface OilChangeCardProps {
  data: OilChange;
  onDelete?: (id: string) => void;
  onToggle?: (id: string) => void;
}

export const OilChangeCard: React.FC<OilChangeCardProps> = ({ data, onDelete, onToggle }) => {
  return (
    <>
      <Card
        className={`w-full p-6 border-2 transition-all ${
          data.completado
            ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
            : "bg-white border-gray-200 hover:border-blue-300"
        }`}
      >
        <div className="space-y-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{data.cliente}</h2>
              <p className="text-sm text-gray-600 mt-1">{data.vehiculo}</p>
            </div>
            <span className="text-xs font-bold uppercase bg-blue-600 text-white px-3 py-1 rounded-full">
              {data.placa}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 font-semibold">KILOMETRAJE ACTUAL</p>
              <p className="text-lg font-bold text-gray-900">{data.kilometraje} km</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 font-semibold">PRÓXIMO CAMBIO</p>
              <p className="text-lg font-bold text-blue-600">{data.proximoCambio} km</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 font-semibold">FECHA</p>
              <p className="text-sm font-semibold text-gray-900">{data.fecha}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 font-semibold">ACEITE USADO</p>
              <p className="text-sm font-semibold text-gray-900">{data.aceiteUsado}</p>
            </div>
          </div>

          <div className={`px-4 py-2 rounded-lg text-center font-semibold ${
            data.completado
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}>
            {data.completado ? "✓ Realizado" : "⏳ Pendiente"}
          </div>

          <div className="flex gap-2">
            {onToggle && (
              <Button
                variant={data.completado ? "secondary" : "primary"}
                className="flex-1"
                onClick={() => onToggle(data.id)}
              >
                {data.completado ? "Reabrir" : "Marcar como hecho"}
              </Button>
            )}
            <Button
              variant="primary"
              className="flex-1"
              onClick={async () => {
                try {
                  await generatePDF(`pdf-${data.id}`, `CambioAceite_${data.cliente}.pdf`);
                } catch (err) {
                  console.error("Error al generar PDF:", err);
                }
              }}
            >
              Descargar PDF
            </Button>
            {onDelete && (
              <Button variant="danger" className="flex-1" onClick={() => onDelete(data.id)}>
                Eliminar
              </Button>
            )}
          </div>
        </div>
      </Card>

      <div id={`pdf-${data.id}`} style={{ display: "none" }}>
        <PDFCard data={data} />
      </div>
    </>
  );
};

function PDFCard({ data }: { data: OilChange }) {
  return (
    <div style={{
      width: "100mm",
      height: "160mm",
      backgroundColor: "#ffffff",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "35px",
        backgroundColor: "#1e40af",
        color: "white",
        padding: "8px 20px",
        fontSize: "18px",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        borderBottom: "4px solid #f59e0b"
      }}>
        Bgarage
      </div>

      <div style={{ marginTop: "45px", paddingBottom: "80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <span style={{ fontSize: "28px", filter: "brightness(1.5)" }}>🚗</span>
          <div>
            <div style={{ fontSize: "20px", fontWeight: "bold", color: "#111827" }}>
              {data.cliente}
            </div>
            <div style={{ fontSize: "11px", color: "#6b7280" }}>
              {data.vehiculo}
            </div>
          </div>
          <span style={{ fontSize: "28px", marginLeft: "auto" }}>🛢</span>
        </div>

        <div style={{
          backgroundColor: "#ffffff",
          padding: "14px",
          borderRadius: "8px",
          marginBottom: "14px",
          border: "3px solid #000000",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "10px", color: "#6b7280", fontWeight: "bold", marginBottom: "6px" }}>
            PLACA
          </div>
          <div style={{ fontSize: "32px", fontWeight: "bold", color: "#000000", letterSpacing: "3px" }}>
            {data.placa}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
          <div style={{ backgroundColor: "#f3f4f6", padding: "10px", borderRadius: "4px" }}>
            <div style={{ fontSize: "9px", color: "#6b7280", fontWeight: "bold", marginBottom: "3px" }}>
              KM ACTUAL
            </div>
            <div style={{ fontSize: "14px", fontWeight: "bold", color: "#000" }}>
              {data.kilometraje} km
            </div>
          </div>
          <div style={{ backgroundColor: "#f3f4f6", padding: "10px", borderRadius: "4px" }}>
            <div style={{ fontSize: "9px", color: "#6b7280", fontWeight: "bold", marginBottom: "3px" }}>
              PRÓXIMO
            </div>
            <div style={{ fontSize: "14px", fontWeight: "bold", color: "#000" }}>
              {data.proximoCambio} km
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
          <div style={{ backgroundColor: "#dbeafe", padding: "10px", borderRadius: "4px", border: "1px solid #1e40af" }}>
            <div style={{ fontSize: "9px", color: "#1e40af", fontWeight: "bold", marginBottom: "3px" }}>
              FECHA
            </div>
            <div style={{ fontSize: "12px", fontWeight: "bold", color: "#000" }}>
              {data.fecha}
            </div>
          </div>
          <div style={{ backgroundColor: "#fef3c7", padding: "10px", borderRadius: "4px", border: "1px solid #fbbf24" }}>
            <div style={{ fontSize: "9px", color: "#92400e", fontWeight: "bold", marginBottom: "3px" }}>
              ACEITE
            </div>
            <div style={{ fontSize: "11px", fontWeight: "bold", color: "#000" }}>
              {data.aceiteUsado}
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: data.completado ? "#d1fae5" : "#fef3c7",
          padding: "10px",
          borderRadius: "4px",
          textAlign: "center",
          fontWeight: "bold",
          color: data.completado ? "#065f46" : "#92400e",
          border: `1px solid ${data.completado ? "#10b981" : "#fbbf24"}`,
          fontSize: "11px"
        }}>
          {data.completado ? "✓ REALIZADO" : "⏳ PENDIENTE"}
        </div>
      </div>

      <div style={{
        position: "absolute",
        bottom: "8px",
        left: "20px",
        right: "20px",
        textAlign: "center",
        borderTop: "2px solid #1e40af",
        paddingTop: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px"
      }}>
        <span style={{ fontSize: "18px" }}>🔧</span>
        <div style={{ fontSize: "13px", fontWeight: "bold", color: "#1e40af" }}>
          BGARAGE
        </div>
        <span style={{ fontSize: "18px" }}>⚙️</span>
      </div>
    </div>
  );
}
