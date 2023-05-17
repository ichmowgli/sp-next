import { type BundlesEnum } from "@/lib/constants";
import { useCalcStore } from "@/lib/store";
import { Switch } from "./ui/switch";

export default function ItemSwitch({
  bundle,
  item,
}: {
  bundle: BundlesEnum;
  item: string;
}) {
  const store = useCalcStore();

  return (
    <Switch
      id={`switch-${item}`}
      onCheckedChange={(checked) =>
        checked
          ? store.addService(bundle, item)
          : store.removeService(bundle, item)
      }
      checked={store.isSelected(bundle, item)}
      disabled={!store.canAdd(bundle, item)}
    />
  );
}
