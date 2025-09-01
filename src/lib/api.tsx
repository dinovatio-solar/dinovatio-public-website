export type CalcPayload = {
consumoMensualKWh: number;
cargoVariable: number;
potenciaAcKw: number;
shareManana: number;
shareTarde: number;
shareNoche: number;
superficieDisponibleM2: number;
ratioDcAc: number;
};


export type ApiResponse = {
energiaConsumidaAnualKWh: number;
ahorroFraccion: number;
ahorroPorcentaje?: number;
ahorroPesos: number;
potenciaAcKw: number;
superficieMinTechoM2: number;
superficieElegidaM2: number;
potenciaSeleccionadaKw: number;
};


const API_URL = "http://localhost:5005/calc/ahorro"; // <-- reemplaza con tu endpoint real


export async function postCalculo(payload: CalcPayload): Promise<ApiResponse> {
const res = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
if (!res.ok) throw new Error("Respuesta no OK del servidor");
return res.json();
}