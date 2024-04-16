import { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

import { useCustomers } from "@/hooks/useData";

import { SEO } from "@/components/SEO";
import ApiLoader from "@/components/loading/ApiLoader";
import { DataTable } from "@/components/data-table";
import { CustomersColumn } from "@/components/data-table/customers/CustomersColumn";

const Users = () => {
  const { isLoading, data } = useCustomers();

  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      delay: 150,
    });
  }, []);

  return (
    <>
      <SEO title="HDMovie-Users" />
      <div className="space-y-8 rounded-md border bg-background p-4 md:p-8">
        <header className="text-xl font-semibold">Users</header>
        {isLoading ? (
          <ApiLoader />
        ) : (
          <DataTable
            data={data}
            columns={CustomersColumn}
            seachType="fullname"
          />
        )}
      </div>
    </>
  );
};

export default Users;
