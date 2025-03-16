import Banner from "./components/Banner";
import NFt2 from "@/admin/assets/img/nfts/Nft2.png";
import NFt4 from "@/admin/assets/img/nfts/Nft4.png";
import NFt3 from "@/admin/assets/img/nfts/Nft3.png";
import NFt5 from "@/admin/assets/img/nfts/Nft5.png";
import NFt6 from "@/admin/assets/img/nfts/Nft6.png";
import avatar1 from "@/admin/assets/img/avatars/avatar1.png";
import avatar2 from "@/admin/assets/img/avatars/avatar2.png";
import avatar3 from "@/admin/assets/img/avatars/avatar3.png";

import tableDataTopCreators from "@/admin/pages/marketplace/variables/tableDataTopCreators";
import HistoryCard from "./components/HistoryCard";
import TopCreatorTable from "./components/TableTopCreators";
import NewCard from "@/admin/components/card/NewCard";

const Project = () => {
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* NFt Header */}
        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            Trending NFTs
          </h4>
          <ul className="mt-4 flex items-center justify-between md:mt-0 md:justify-center md:!gap-5 2xl:!gap-12">
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                Art
              </a>
            </li>
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                Music
              </a>
            </li>
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                Collection
              </a>
            </li>
            <li>
              <a
                className="text-base font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" "
              >
                <a href=" ">Sports</a>
              </a>
            </li>
          </ul>
        </div>

        {/* NFTs trending card */}
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-3">
          <NewCard
            title="Tieu de du an"
            description="Esthera Jackson"
            demoLink="0.91"
            image={NFt3}
            technologies={[
              { name: "Laravel", icon: "/icons/laravel.svg", link: "https://laravel.com" },
              { name: "React", icon: "/icons/react.svg", link: "https://react.dev" },
              { name: "TailwindCSS", icon: "/icons/tailwindcss.svg", link: "https://tailwindcss.com" },
              { name: "MySQL", icon: "/icons/mysql.svg", link: "https://www.mysql.com" }
            ]}
          />
          <NewCard
            title="ETH AI Brain"
            description="Nick Wilson"
            demoLink="0.7"
            image={NFt2}
            technologies={[
              { name: "Laravel", icon: "/icons/laravel.svg", link: "https://laravel.com" },
              { name: "React", icon: "/icons/react.svg", link: "https://react.dev" },
              { name: "TailwindCSS", icon: "/icons/tailwindcss.svg", link: "https://tailwindcss.com" },
              { name: "MySQL", icon: "/icons/mysql.svg", link: "https://www.mysql.com" }
            ]}
          />
          <NewCard
            title="Mesh Gradients"
            description="Will Smith"
            demoLink="2.91"
            image={NFt4}
            technologies={[
              { name: "Laravel", icon: "/icons/laravel.svg", link: "https://laravel.com" },
              { name: "React", icon: "/icons/react.svg", link: "https://react.dev" },
              { name: "TailwindCSS", icon: "/icons/tailwindcss.svg", link: "https://tailwindcss.com" },
              { name: "MySQL", icon: "/icons/mysql.svg", link: "https://www.mysql.com" }
            ]}
          />

          <NewCard
            title="Abstract Colors"
            description="Esthera Jackson"
            demoLink="0.91"
            image={NFt3}
            technologies={[
              { name: "Laravel", icon: "/icons/laravel.svg", link: "https://laravel.com" },
              { name: "React", icon: "/icons/react.svg", link: "https://react.dev" },
              { name: "TailwindCSS", icon: "/icons/tailwindcss.svg", link: "https://tailwindcss.com" },
              { name: "MySQL", icon: "/icons/mysql.svg", link: "https://www.mysql.com" }
            ]}
          />
          <NewCard
            title="ETH AI Brain"
            description="Nick Wilson"
            demoLink="0.7"
            image={NFt2}
            technologies={[
              { name: "Laravel", icon: "/icons/laravel.svg", link: "https://laravel.com" },
              { name: "React", icon: "/icons/react.svg", link: "https://react.dev" },
              { name: "TailwindCSS", icon: "/icons/tailwindcss.svg", link: "https://tailwindcss.com" },
              { name: "MySQL", icon: "/icons/mysql.svg", link: "https://www.mysql.com" }
            ]}
          />
          <NewCard
            title="Mesh Gradients"
            description="Will Smith"
            demoLink="2.91"
            image={NFt4}
            technologies={[
              { name: "Laravel", icon: "/icons/laravel.svg", link: "https://laravel.com" },
              { name: "React", icon: "/icons/react.svg", link: "https://react.dev" },
              { name: "TailwindCSS", icon: "/icons/tailwindcss.svg", link: "https://tailwindcss.com" },
              { name: "MySQL", icon: "/icons/mysql.svg", link: "https://www.mysql.com" }
            ]}
          />
        </div>
      </div>

      {/* right side section */}

      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <TopCreatorTable tableData={tableDataTopCreators} />
        <div className="mb-5" />
      </div>
    </div>
  );
};

export default Project;
