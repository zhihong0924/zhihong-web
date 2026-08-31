import Image from "next/image";

const screens = [
  { className: "phone-shop", src: "/images/work/tzh-sports-centre-shop.png", alt: "TZH Sports Centre shop showing Yonex string products" },
  { className: "phone-main", src: "/images/work/tzh-sports-centre-booking.png", alt: "TZH Sports Centre court booking flow" },
  { className: "phone-lessons", src: "/images/work/tzh-sports-centre-lessons.png", alt: "TZH Sports Centre lesson pricing screen" },
];

export default function TZHProductPreview() {
  return (
    <div className="product-phone-stack" aria-label="TZH Sports Centre product screens">
      {screens.map((screen) => (
        <div className={`phone-screen ${screen.className}`} key={screen.src}>
          <Image src={screen.src} alt={screen.alt} fill sizes="(max-width: 700px) 8rem, 10rem" />
        </div>
      ))}
    </div>
  );
}
