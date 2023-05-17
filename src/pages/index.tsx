import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { BUNDLES, LABELS, PRICES } from "@/lib/constants";
import { useCalcStore } from "@/lib/store";
import { type NextPage } from "next";
import Head from "next/head";
import { ReactNode } from "react";

const currencyFormatter = new Intl.NumberFormat("pl", {
  style: "currency",
  currency: "PLN",
});

const FlowStep = ({
  title_number,
  title,
  children,
}: {
  title_number: number;
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="mb-6 sm:mb-8 md:mb-10">
      <div className="toggle-group-header">
        <span className="toggle-group-number">{title_number}</span>
        <h2 className="toggle-group-title">{title}</h2>
      </div>
      <div className="sm:ml-10	md:ml-[6.5rem]">{children}</div>
    </div>
  );
};

const ToggleYear = ({ year }: { year: keyof typeof PRICES }) => {
  const store = useCalcStore();

  return (
    <ToggleGroup.Root
      className="toggle_group"
      style={{ scrollBehavior: "smooth" }}
      type="single"
      defaultValue={year.toString()}
      aria-label="Text alignment"
      onValueChange={(year) =>
        year && store.selectYear(Number(year) as keyof typeof PRICES)
      }
    >
      {Object.keys(PRICES).map((year) => (
        <ToggleGroup.Item
          className="toggle_item"
          value={year}
          aria-label="Left aligned"
          key={`year-toggle-${year}`}
        >
          {year}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
};

const ToggleBundle = ({ bundle }: { bundle: keyof typeof BUNDLES }) => {
  const store = useCalcStore();

  return (
    <ToggleGroup.Root
      className="toggle_group"
      style={{ scrollBehavior: "smooth" }}
      type="single"
      defaultValue={bundle}
      aria-label="Text alignment"
      onValueChange={(bundle) =>
        bundle && store.selectBundle(bundle as keyof typeof BUNDLES)
      }
    >
      {Object.keys(BUNDLES).map((bundle) => (
        <ToggleGroup.Item
          className="toggle_item"
          value={bundle}
          aria-label="Left aligned"
          key={`toggle-${bundle}`}
        >
          <p>{LABELS[bundle as keyof typeof BUNDLES]}</p>
          <p>
            {/* @ts-ignore */}
            {currencyFormatter.format(PRICES[store.selectedYear][bundle] ?? 0)}
            /mo
          </p>
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
};

const ItemSwitch = ({
  bundle,
  item,
}: {
  bundle: keyof typeof BUNDLES;
  item: string;
}) => {
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
};

const AddOns = ({ bundle }: { bundle: keyof typeof BUNDLES }) => {
  const store = useCalcStore();

  return (
    <>
      {BUNDLES[bundle].items.map((item) => (
        <div
          key={`container-switch-${item}`}
          className="flex items-center space-x-2 "
        >
          <Tooltip>
            {item == "decoder" && !store.canAdd(bundle, item) ? (
              <TooltipTrigger>
                <ItemSwitch bundle={bundle} item={item} />
              </TooltipTrigger>
            ) : (
              <ItemSwitch bundle={bundle} item={item} />
            )}
            <TooltipContent>
              <p className="text-red-400">Can be added only with TV</p>
            </TooltipContent>
          </Tooltip>
          <Label
            htmlFor={`switch-${item}`}
            className="font-regular text-sm md:text-xl xl:text-2xl"
          >
            {LABELS[item]} (+{" "}
            {currencyFormatter.format(PRICES[store.selectedYear][item])}/mo)
          </Label>
        </div>
      ))}
    </>
  );
};

const Offer = ({
  bundle,
  year,
  item = [],
}: {
  bundle: keyof typeof BUNDLES;
  year: number;
  item?: string[];
}) => {
  const store = useCalcStore();

  const selectedItems = store.selectedItems[store.selectedBundle];
  return (
    <div className="font-regular text-sm md:text-xl xl:text-2xl">
      <p>Year: {store.selectedYear}</p>
      <p>Bundle: {LABELS[store.selectedBundle]}</p>
      <p>
        Add-Ons:{" "}
        {selectedItems.length
          ? selectedItems
              .map((item) => LABELS[item as keyof typeof LABELS])
              .join(", ")
          : "None"}
      </p>
      <h3 className="mt-2 text-xl font-bold md:text-2xl">
        Total price: {currencyFormatter.format(store.totalPrice(bundle))}/mo
      </h3>
    </div>
  );
};

const Home: NextPage = () => {
  const store = useCalcStore();

  return (
    <>
      <Head>
        <title>SP Test</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TooltipProvider>
        <main className="mx-5 sm:mx-10">
          <FlowStep title_number={1} title={"Select a year"}>
            <ToggleYear year={2023} />
          </FlowStep>
          <FlowStep title_number={2} title={"Pick a bundle"}>
            <ToggleBundle bundle={"noBundle"} />
          </FlowStep>
          <FlowStep title_number={3} title={"Choose Add-ons"}>
            <AddOns bundle={store.selectedBundle} />
          </FlowStep>
          <FlowStep title_number={4} title={"Review your offer"}>
            <Offer year={store.selectedYear} bundle={store.selectedBundle} />
          </FlowStep>
        </main>
      </TooltipProvider>
    </>
  );
};

export default Home;
