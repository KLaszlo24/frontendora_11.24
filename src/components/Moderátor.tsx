
import CipoLista from "../api/api";

export function Moderator() {
    const {
        cipok,
        handleRendelesTorlese,
        handleArModositasa,
        handleFizetesModositasa
    } = CipoLista();

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
            <h1>Moderátor oldal</h1>

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
