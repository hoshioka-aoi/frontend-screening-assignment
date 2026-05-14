"use client";

import { useCallback, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import styles from "./Home.module.css";
import { FlightLogService } from "../(flightlog)/fightlog.service";
import { computeRouteStats, formatDuration } from "../(flightlog)/flightlog.utils";
import LogCard from "../(flightlog)/LogCard";
import LogForm from "../(flightlog)/LogForm";
import { FlightLog } from "../types";
import { PlaneTakeoff, PlaneLanding, ClipboardList} from "lucide-react";

const flightLogService = new FlightLogService();

export default function Home() {
  const [logs, setLogs] = useState<FlightLog[]>([]);

  useEffect(() => {
    flightLogService.getLogs().then(setLogs);
  }, []);

  const handleAddLog = useCallback((log: FlightLog) => {
    setLogs((prev) => [...prev, log]);
  }, []);

  const routeStats = useMemo(() => computeRouteStats(logs), [logs]);

  const handlePrintAvgTimes = useCallback(() => {
    for (const [route, { total, count }] of Object.entries(routeStats)) {
      const avg = total / count; // O(1) — no array to reduce
      console.log(`${route}: ${formatDuration(avg)}`);
    }
  }, [routeStats]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div
          style={{
            width: "100%",
            margin: "16px",
            padding: "40px 32px",
            borderRadius: 16,
            overflow: "hidden",
            position: "relative",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: 260,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 600,
            }}
          >
            <h1
              className={styles.title}
              style={{
                margin: 0,
                marginBottom: 12,
                fontSize: "3.2rem",
                fontWeight: 700,
                color: "white",
                textAlign: "left",
              }}
            >
              Welcome to{" "} <br/>
              <a
                href="https://nextjs.org"
                style={{
                  color: "#93c5fd",
                  textDecoration: "none",
                }}
              >
                Next Airlines!
              </a>
            </h1>

            <p
              style={{
                margin: 0,
                color: "#e5e7eb",
                fontSize: 16,
                lineHeight: 1.6,
                textAlign: "left",
              }}
            >
              Airline departure and arrival management dashboard
            </p>
          </div>
        </div>
        <div className={styles.card} style={{ margin: 16, width: "100%" }}>
          <h2  
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
          }}
          >
            <ClipboardList size={22} />
            Flight Logs
          </h2>
          <LogCard data={logs} />
          <div style={{ display: "flex", justifyContent: "center", marginTop: 12,}}>
          <button
            onClick={handlePrintAvgTimes}
            style={{ marginTop: 12, background: "none", border: "none", padding: 0, color: "#0070f3", textDecoration: "underline", cursor: "pointer", fontSize: 12,}}>
            Print Average time to console
          </button>
          </div>
          </div>
        <div
        style={{
          display: "flex",
          gap: 16,
          width: "100%",
          margin: "16px 0",
        }}
      >
        <div
          className={styles.card}
          style={{
            flex: 1,
            margin: 0,
          }}
        >
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#dc2626",
            }}
          >
            <PlaneTakeoff size={22} />
            Departure Logging
          </h2>

          <LogForm
            data={logs}
            type="departure"
            onSubmit={handleAddLog}
          />
        </div>

        <div
          className={styles.card}
          style={{
            flex: 1,
            margin: 0,
          }}
        >
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#03bd00",
            }}
          >
            <PlaneLanding size={22} />
            Arrival Logging
          </h2>

          <LogForm
            data={logs}
            type="arrival"
            onSubmit={handleAddLog}
          />
        </div>
      </div>
      </main>
      <footer className={styles.footer}>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}