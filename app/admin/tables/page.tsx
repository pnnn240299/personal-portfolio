'use client'

import tableDataDevelopment from "@/admin/pages/tables/variables/tableDataDevelopment";
import tableDataCheck from "@/admin/pages/tables/variables/tableDataCheck";
import CheckTable from "@/admin/pages/tables/components/CheckTable";
import tableDataColumns from "@/admin/pages/tables/variables/tableDataColumns";
import tableDataComplex from "@/admin/pages/tables/variables/tableDataComplex";
import DevelopmentTable from "@/admin/pages/tables/components/DevelopmentTable";
import ColumnsTable from "@/admin/pages/tables/components/ColumnsTable";
import ComplexTable from "@/admin/pages/tables/components/ComplexTable";

function Tables() {
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