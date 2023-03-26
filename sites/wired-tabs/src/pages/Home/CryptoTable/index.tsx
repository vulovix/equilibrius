import { useEffect, useMemo } from "react";
import Table from "../../../components/Table";
import useTickerRealtimeData from "../../../providers/TickerSymbol/useTickerRealtimeData";
import { columnDefinition } from "./data";
import { CryptoTableProps } from "./types";

const { Row, Field } = Table;

export default function CryptoTable(props: CryptoTableProps): JSX.Element {
    const { symbols } = props;
    const {data, initialData} = useTickerRealtimeData({ symbols });
    console.log(initialData);

    const Header = useMemo(() => {
        return (
            <Row>
                {columnDefinition.map((field) => (
                    <Field key={field.key}>{field.name}</Field>
                ))}
            </Row>
        );
    }, [columnDefinition]);
    console.log(data, initialData);
    return (
        <div className="home">
            <Table>
                {Header}
                {data.map((record) => (
                    <Row key={record.chanId}>
                        {columnDefinition.map((column) => (
                            <Field key={`${record.chanId}_${column.key}`}>
                                {record[column.key] || initialData?.[record.pair]?.[column.key]}
                            </Field>
                        ))}
                    </Row>
                ))}
            </Table>
        </div>
    );
}
