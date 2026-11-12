import { useContext } from "react";
import { NotificationContext, type NotificationState } from "../contexts/NotificationContext";

export function useNotifications(): NotificationState {
  const value = useContext(NotificationContext);
  if (!value) throw new Error("useNotifications must be used inside NotificationProvider");
  return value;
}
