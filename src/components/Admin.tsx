
import { useState } from "react";
import CipoLista from "../api/api";
import type { Ciporendeles } from "../Cipo";

export function Admin() {
    const {
        cipok,
        handleRendelesFelvetele,
        handleRendelesTorlese,
        handleArModositasa,
        handleFizetesModositasa
    } = CipoLista();

    const [termek_neve, setTermekNeve] = useState("");
    const [ar, setAr] = useState(0);
    const [rendeles_datum, setRendelesDatum] = useState("");
    const [meret, setMeret] = useState(0);
    const [szin, setSzin] = useState("");
    const [szallitasi_cim, setSzallitasiCim] = useState("");

    async function UjRendeles() {
        const ujCipo: Omit<Ciporendeles, "id"> = {
            termek_neve,
            ar,
            rendeles_datum,
            fizetve: false,
            meret,
            szin,
            szallitasi_cim
        };

        await handleRendelesFelvetele(ujCipo);

        setTermekNeve("");
        setAr(0);
        setRendelesDatum("");
        setMeret(0);
        setSzin("");
        setSzallitasiCim("");
    }

    function ArNovelese(id: string, aktualisAr: number) {
        handleArModositasa(id, aktualisAr + 1000);
    }

    function ArCsokkentese(id: string, aktualisAr: number) {
        if (aktualisAr >= 1000) {
            handleArModositasa(id, aktualisAr - 1000);
        }
    }

    return (
        <>
            <h1>Admin oldal</h1>

            <h2>Új cipőrendelés felvétele</h2>

            <div className="mb-3">
                <label className="form-label">Termék neve</label>
                <input
                    className="form-control"
                    value={termek_neve}
                    onChange={e => setTermekNeve(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Ár (Ft)</label>
                <input
                    type="number"
                    className="form-control"
                    value={ar}
                    onChange={e => setAr(Number(e.target.value))}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Rendelés dátuma</label>
                <input
                    type="date"
                    className="form-control"
                    value={rendeles_datum}
                    onChange={e => setRendelesDatum(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Méret</label>
                <input
                    type="number"
                    className="form-control"
                    value={meret}
                    onChange={e => setMeret(Number(e.target.value))}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Szín</label>
                <input
                    className="form-control"
                    value={szin}
                    onChange={e => setSzin(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Szállítási cím</label>
                <input
                    className="form-control"
                    value={szallitasi_cim}
                    onChange={e => setSzallitasiCim(e.target.value)}
                />
            </div>

            <button
                className="btn btn-success mb-4"
                onClick={UjRendeles}
                disabled={!termek_neve ||ar <= 0 ||!rendeles_datum ||meret <= 0 ||!szin ||!szallitasi_cim}
                > Rendelés felvétele
            </button>

            <hr />

            <h2>Cipőrendelések kezelése</h2>

            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Termék neve</th>
                        <th>Ár</th>
                        <th>Rendelés dátuma</th>
                        <th>Fizetve</th>
                        <th>Méret</th>
                        <th>Szín</th>
                        <th>Szállítási cím</th>
                        <th>Műveletek</th>
                    </tr>
                </thead>

                <tbody>
                    {cipok.map(cipo => (
                        <tr key={cipo.id}>
                            <td>{cipo.termek_neve}</td>

                            <td>
                                {cipo.ar} Ft
                                <br />

                                <button
                                    className="btn btn-sm btn-success m-1"
                                    onClick={() =>
                                        ArNovelese(cipo.id.toString(), cipo.ar)
                                    }
                                >
                                    +
                                </button>

                                <button
                                    className="btn btn-sm btn-warning m-1"
                                    onClick={() =>
                                        ArCsokkentese(cipo.id.toString(), cipo.ar)
                                    }
                                >
                                    -
                                </button>
                            </td>

                            <td>{cipo.rendeles_datum}</td>

                            <td>
                                <button
                                    className={`btn btn-sm ${
                                        cipo.fizetve
                                            ? "btn-success"
                                            : "btn-danger"
                                    }`}
                                    onClick={() =>
                                        handleFizetesModositasa(
                                            cipo.id.toString(),
                                            !cipo.fizetve
                                        )
                                    }
                                >
                                    {cipo.fizetve ? "Fizetve" : "Nincs fizetve"}
                                </button>
                            </td>

                            <td>{cipo.meret}</td>
                            <td>{cipo.szin}</td>
                            <td>{cipo.szallitasi_cim}</td>

                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        handleRendelesTorlese(cipo.id.toString())
                                    }
                                >
                                    Törlés
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
