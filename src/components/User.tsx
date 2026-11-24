
import CipoLista from "../api/api";

export function User() {
    const { cipok } = CipoLista();

    return (
        <>
            <h1>Cipők</h1>

            <h2>Cipők listája</h2>

            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>Név</th>
                        <th>Ár</th>
                        <th>Rendelés dátuma</th>
                        <th>Fizetve</th>
                        <th>Méret</th>
                        <th>Szín</th>
                        <th>Szállítási cím</th>
                    </tr>
                </thead>

                <tbody>
                    {cipok.map((cipo) => (
                        <tr key={cipo.id}>
                            <td>{cipo.termek_neve}</td>
                            <td>{cipo.ar} Ft</td>
                            <td>{cipo.rendeles_datum}</td>
                            <td>
                                {cipo.fizetve ? "Igen" : "Nem"}
                            </td>
                            <td>{cipo.meret}</td>
                            <td>{cipo.szin}</td>
                            <td>{cipo.szallitasi_cim}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
