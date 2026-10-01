"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "./Dashboard";

const Adminpage = () => {
  const router = useRouter();

  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch("/api/admin", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (data.success) {
          setAdmin(data.admin);
        } else {
          router.replace("/admin/login");
        }
      } catch (error) {
        console.log("ADMIN CHECK ERROR:", error);
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="admin-auth-loading">
        <h3></h3>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return <AdminDashboard admin={admin} />;
};

export default Adminpage;