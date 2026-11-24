
import { useEffect, useState } from "react";
import type { Ciporendeles } from "../Cipo";

const URL = "http://localhost:3000/adatok";

function CipoLista() {
    const [cipok, setCipok] = useState<Ciporendeles[]>([]);

    useEffect(() => {
        async function Betoltes() {
            try {
                const valasz = await fetch(URL);

                if (!valasz.ok) {
                    throw new Error("Az adatok betöltése sikertelen!");
                }

                const data: Ciporendeles[] = await valasz.json();
                setCipok(data);

            } catch (err) {
                console.log(err);
            }
        }

        Betoltes();
    }, []);

    async function handleRendelesFelvetele(
        rendeles: Omit<Ciporendeles, "id">
    ) {
        try {
            const valasz = await fetch(URL, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(rendeles)
            });

            if (!valasz.ok) {
                throw new Error("A rendelés felvétele sikertelen!");
            }

            const ujRendeles: Ciporendeles = await valasz.json();

            setCipok(elozo => [...elozo, ujRendeles]);

        } catch (err) {
            console.log(err);
        }
    }
    async function handleRendelesTorlese(id: string) {
        try {
            const valasz = await fetch(URL + "/" + id, {
                method: "DELETE"
            });

            if (!valasz.ok) {
                throw new Error("A rendelés törlése sikertelen!");
            }

            setCipok(elozo =>
                elozo.filter(cipo => cipo.id.toString() !== id)
            );

        } catch (err) {
            console.log(err);
        }
    }

    async function handleArModositasa(id: string, ujAr: number) {
        try {
            const valasz = await fetch(URL + "/" + id, {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    ar: ujAr
                })
            });

            if (!valasz.ok) {
                throw new Error("Az ár módosítása sikertelen!");
            }

            setCipok(elozo =>
                elozo.map(cipo =>
                    cipo.id.toString() === id
                        ? { ...cipo, ar: ujAr }
                        : cipo
                )
            );

        } catch (err) {
            console.log(err);
        }
    }

    async function handleFizetesModositasa(
        id: string,
        ujAllapot: boolean
    ) {
        try {
            const valasz = await fetch(URL + "/" + id, {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    fizetve: ujAllapot
                })
            });

            if (!valasz.ok) {
                throw new Error("A fizetés módosítása sikertelen!");
            }

            setCipok(elozo =>
                elozo.map(cipo =>
                    cipo.id.toString() === id
                        ? { ...cipo, fizetve: ujAllapot }
                        : cipo
                )
            );

        } catch (err) {
            console.log(err);
        }
    }
}

export default CipoLista;
