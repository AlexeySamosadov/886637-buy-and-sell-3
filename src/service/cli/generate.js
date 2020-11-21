'use strict';
const fs = require(`fs`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;

const {
  ExitCode
} = require(`../../constants`);

const PictureRestrict = {
  MIN: 1,
  MAX: 1000,
}

const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const TITLES = [
  'Продам книги Стивена Кинга.',
  'Продам новую приставку Sony Playstation 5.',
  'Продам отличную подборку фильмов на VHS.',
  'Куплю антиквариат.',
  'Куплю породистого кота.',
  'Продам коллекцию журналов «Огонёк».',
  'Отдам в хорошие руки подшивку «Мурзилка».',
  'Продам советскую посуду. Почти не разбита.',
  'Куплю детские санки.',
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
  'Две страницы заляпаны свежим кофе.',
  'Кажется, что это хрупкая вещь.',
  'Мой дед не мог её сломать.',
  'Кому нужен этот новый телефон, если тут такое...',
  'Не пытайтесь торговаться. Цену вещам я знаю.',
];

const IMAGE_FILE_NAMES = [
  `tvovar_v_otlochnom_sostoyanii`,
  `peregno_and_good_conditions`,
  `sell_with_heart_hurt`,
  'buy_antique',
  'buy_cat_breed'
]




const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const getPictureFileName = (i) => {
  return IMAGE_FILE_NAMES[i];
}


const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    if (count > 1000) {
      console.log('Не больше 1000 объявлений');
      process.exit(ExitCode.error);
    }
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created.`);
    });
  }
}
