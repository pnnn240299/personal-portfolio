import tableDataDevelopment from "../../../src/admin/pages/tables/variables/tableDataDevelopment";
import tableDataCheck from "../../../src/admin/pages/tables/variables/tableDataCheck";
import CheckTable from "../../../src/admin/pages/tables/components/CheckTable";
import tableDataColumns from "../../../src/admin/pages/tables/variables/tableDataColumns";
import tableDataComplex from "../../../src/admin/pages/tables/variables/tableDataComplex";
import DevelopmentTable from "../../../src/admin/pages/tables/components/DevelopmentTable";
import ColumnsTable from "../../../src/admin/pages/tables/components/ColumnsTable";
import ComplexTable from "../../../src/admin/pages/tables/components/ComplexTable";

const Tables = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <DevelopmentTable tableData={tableDataDevelopment} />
        <CheckTable tableData={tableDataCheck} />
      </div>

      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <ColumnsTable tableData={tableDataColumns} />

        <ComplexTable tableData={tableDataComplex} />
      </div>
    </div>
  );
};

export default Tables;