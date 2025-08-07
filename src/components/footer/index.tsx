import clsx from 'clsx';

const MENU = [
  {
    title: '会員登録',
  },
  {
    title: '運営会社',
  },
  {
    title: '利用規約',
  },
  {
    title: '個人情報の取扱について',
  },
  {
    title: '特定商取引法に基づく表記',
  },
  {
    title: 'お問い合わせ',
  },
];

function Footer() {
  return (
    <footer>
      <div className="min-h-[128px] bg-gray-500 flex items-center">
        <div className="container-tablet ">
          <div className="flex flex-wrap gap-x-[30px] gap-y-[15px]">
            {MENU.map((item, idx) => (
              <h6
                key={idx}
                className={clsx(
                  'font-noto-sans-jp font-light text-s leading-[16px] text-white tracking-normal-2'
                )}
              >
                {item.title}
              </h6>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
