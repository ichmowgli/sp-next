import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const bundleKeys = Object.keys(BUNDLES) as Array<keyof typeof BUNDLES>;


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

const ToggleYear = ({
  year,
}: {
  year: keyof typeof PRICES;
}) => {

  const store = useCalcStore();

  return (
    <div className="mb-6 sm:mb-8 md:mb-10">
      <div className="toggle-group-header">
        <span className="toggle-group-number">
          1
        </span>
        <h2 className="toggle-group-title">
          Select a year
        </h2>
      </div>
      <ToggleGroup.Root
        className="toggle_group"
        style={{ scrollBehavior: "smooth" }}
        type="single"
        defaultValue="left"
        aria-label="Text alignment"
        onValueChange={(year) =>
          year && store.selectYear(Number(year) as keyof typeof PRICES)
        }
      >
        {Object.keys(PRICES).map((year) => (
          <ToggleGroup.Item
            className="toggle_item items-center"
            value={year}
            aria-label="Left aligned"
            key={`year-toggle-${year}`}
          >
            {year}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  )
}

const ToggleBundle = ({ bundle }: { bundle: keyof typeof BUNDLES }) => {

  const store = useCalcStore();

  return (
    <div className="mb-6 sm:mb-8 md:mb-10">
      <div className="toggle-group-header">
        <span className="toggle-group-number">
          2
        </span>
        <h2 className="toggle-group-title">
          Pick a bundle
        </h2>
      </div>
      <ToggleGroup.Root
        className="toggle_group"
        style={{ scrollBehavior: "smooth" }}
        type="single"
        defaultValue="left"
        aria-label="Text alignment"
        onValueChange={(bundle) =>
          store.selectBundle(bundle as keyof typeof BUNDLES)
        }
      >
        {Object.keys(BUNDLES).map((bundle) => (
          <ToggleGroup.Item
            className="toggle_item"
            value={bundle}
            aria-label="Left aligned"
            key={`toggle-${bundle}`}
          >
            {LABELS[bundle]}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  )
}

// const BundleCard = ({ bundle }: { bundle: keyof typeof BUNDLES }) => {
//   const { selectBundle, canAdd, totalPrice } = useCalcStore();

//   return (
//     <div className="h-96 w-60">
//       <Card className="h-full">
//         <CardHeader>
//           <CardTitle className="text-3xl">{LABELS[bundle]}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {BUNDLES[bundle].items.map((item) => (
//             <div
//               key={`container-switch-${item}`}
//               className="flex items-center space-x-2"
//             >
//               <Tooltip>
//                 {item == "decoder" && !canAdd(bundle, item) ? (
//                   <TooltipTrigger>
//                     <ItemSwitch bundle={bundle} item={item} />
//                   </TooltipTrigger>
//                 ) : (
//                   <ItemSwitch bundle={bundle} item={item} />
//                 )}
//                 <TooltipContent>
//                   <p className="text-red-400">Can be added only with TV</p>
//                 </TooltipContent>
//               </Tooltip>
//               <Label htmlFor={`switch-${item}`} className="text-lg">
//                 {LABELS[item]}
//               </Label>
//             </div>
//           ))}
//         </CardContent>
//         <CardFooter>
//           <Button
//             onClick={() => selectBundle(bundle)}
//             disabled={totalPrice(bundle) == 0}
//           >
//             Select for {totalPrice(bundle)} zl / mo
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

const Home: NextPage = () => {
  const store = useCalcStore();

  return (
    <>
      <Head>
        <title>SP Test</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      {store.selectedYear}
      {JSON.stringify(store.selectedBundle)}{" "}
      {JSON.stringify(store.selectedItems)}
      <div className="mx-4 sm:mx-6 md:mx-12">
        {/* <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="toggle-group-header">
            <span className="toggle-group-number">
              1
            </span>
            <h2 className="toggle-group-title">
              Select a year
            </h2>
          </div>
          <ToggleGroup.Root
            className="toggle_group"
            style={{ scrollBehavior: "smooth" }}
            type="single"
            defaultValue="left"
            aria-label="Text alignment"
            onValueChange={(year) =>
              year && store.selectYear(Number(year) as keyof typeof PRICES)
            }
          >
            {Object.keys(PRICES).map((year) => (
              <ToggleGroup.Item
              className="toggle_item items-center"
              value={year}
                aria-label="Left aligned"
                key={`year-toggle-${year}`}
              >
                {year}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
        </div> */}
        {/* <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="toggle-group-header">
            <span className="toggle-group-number">
              2
            </span>
            <h2 className="toggle-group-title">
              Pick a bundle
            </h2>
          </div>
          <ToggleGroup.Root
            className="toggle_group"
            style={{ scrollBehavior: "smooth" }}
            type="single"
            defaultValue="left"
            aria-label="Text alignment"
            onValueChange={(bundle) =>
              store.selectBundle(bundle as keyof typeof BUNDLES)
            }
          >
            {Object.keys(BUNDLES).map((bundle) => (
              <ToggleGroup.Item
                className="toggle_item"
                value={bundle}
                aria-label="Left aligned"
                key={`toggle-${bundle}`}
              >
                {LABELS[bundle]}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
        </div> */}
      </div>
      <TooltipProvider>
        <main className="flex ">
          <div className="mx-4 sm:mx-6 md:mx-12">
            <ToggleYear year={2023} />
            <ToggleBundle bundle={'noBundle'} />
          </div>


          {/* {bundleKeys.map((bundle) => (

            <BundleCard key={`bundle-${bundle}`} bundle={bundle} />
          ))} */}
        </main>
      </TooltipProvider>
    </>
  );
};

export default Home;
