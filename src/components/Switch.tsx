import { type ServicesEnum } from "@/lib/constants";
import { useCalcStore } from "@/lib/store";
import { Switch } from "./ui/switch";

export default function ItemSwitch({ item }: { item: ServicesEnum }) {
  const store = useCalcStore();

  return (
    <Switch
      id={`switch-${item}`}
      onCheckedChange={(checked) =>
        checked ? store.addService(item) : store.removeService(item)
      }
      checked={store.isSelected(item)}
      disabled={!store.canAdd(item)}
    />
  );
}
