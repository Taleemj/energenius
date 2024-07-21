import { FC } from "react";
import { sideNavItems } from "@/data";
import WorldGlobe from "@/components/Globe";
import Content from "@/components/Content";

interface Props {
  params: {
    slug: string;
  };
}

const page: FC<Props> = ({ params }) => {
  const item = sideNavItems.filter((item) => item.href === `/locations/${params.slug}`)[0];

  return (
    <div>
      <Content title={item.title} />
    </div>
  );
};

export default page;
