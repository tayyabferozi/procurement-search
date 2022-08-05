import { Table } from "antd";
import { ColumnType } from "antd/lib/table";
import React from "react";
import { ProcurementRecord } from "./Api";
import { buyer } from "./App";
import ProcurementRecordPreviewModal from "./ProcurementRecordPreview";

type Props = {
  records: ProcurementRecord[];
  onBuyerClick: (buyer: buyer) => void;
};

function RecordsTable(props: Props) {
  const { onBuyerClick, records } = props;
  const [previewedRecord, setPreviewedRecord] = React.useState<
    ProcurementRecord | undefined
  >();

  const columns = React.useMemo<ColumnType<ProcurementRecord>[]>(() => {
    return [
      {
        title: "Published",
        render: (record: ProcurementRecord) =>
          new Date(record.publishDate).toLocaleDateString(),
      },
      {
        title: "Title",
        render: (record: ProcurementRecord) => {
          const handleClick = (e: React.MouseEvent) => {
            e.preventDefault();
            setPreviewedRecord(record);
          };
          return (
            <a href="#" onClick={handleClick}>
              {record.title}
            </a>
          );
        },
      },
      {
        title: "Value",
        render: (record: ProcurementRecord) => (
          <>
            {record.value} <br />
            <small> </small>
          </>
        ),
      },
      {
        title: "Stage",
        render: (record: ProcurementRecord) => (
          <div className="stage-col">
            {record.stage} <br />
            <small>
              {record.award_date && (
                <>
                  {new Date(record.award_date).getTime() > new Date().getTime()
                    ? "(Open until " + record.award_date + ")"
                    : "(Closed)"}
                </>
              )}{" "}
              {record.close_date && <>(Awarded on {record.close_date})</>}
            </small>
          </div>
        ),
      },
      {
        title: "Buyer name",
        render: (record: ProcurementRecord) => (
          <a
            href="#0"
            onClick={() =>
              onBuyerClick({ id: record.buyer.id, name: record.buyer.name })
            }
          >
            {record.buyer.name}
          </a>
        ),
      },
    ];
  }, []);
  return (
    <>
      <Table columns={columns} dataSource={records} pagination={false} />
      <ProcurementRecordPreviewModal
        record={previewedRecord}
        onClose={() => setPreviewedRecord(undefined)}
      />
    </>
  );
}

export default RecordsTable;
