export interface Entrada {
    id: number;
    marca: string;
    placa: string;
    color: string;
    modelo: string;
    numeroEspacio: number;
    hora_entrada: string;
    hora_salida: string;
}

export interface Vehiculos {
    id?: number;
    marca: string;
    modelo: string;
    placa: string;
    color: string;
    tipo: string;
    flag: string;
    numero?: number;
    estado?: string;
}