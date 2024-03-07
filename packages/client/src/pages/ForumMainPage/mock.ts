export const topics = [
  {
    id: 1,
    title: 'Благодарность разработчикам',
    description: 'Топик благодарности разработчикам этой божественной игры',
  },
  {
    id: 2,
    title: 'Какая же крутая игра',
    description: 'Взрываю бомбы и не могу остановиться',
  },
  {
    id: 3,
    title: 'Позор читерам',
    description:
      'Топик для выявления читеров. Сообщайте нам о любой подозрительной активности',
  },
]

export const topicsMessages: Record<
  string,
  Array<{ id: number; author: string; text: string }>
> = {
  '1': [
    {
      id: 1,
      author: 'Vasya',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, maiores quo? Harum debitis dolorum quam in aspernatur aliquam repellendus ullam est beatae molestias voluptate corporis iusto, similique id, reiciendis soluta.',
    },
    {
      id: 2,
      author: 'Vasya',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, maiores quo? Harum debitis dolorum quam in aspernatur aliquam repellendus ullam est beatae molestias voluptate corporis iusto, similique id, reiciendis soluta.',
    },
    {
      id: 3,
      author: 'Vasya',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, maiores quo? Harum debitis dolorum quam in aspernatur aliquam repellendus ullam est beatae molestias voluptate corporis iusto, similique id, reiciendis soluta.',
    },
    {
      id: 4,
      author: 'Vasya',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, maiores quo? Harum debitis dolorum quam in aspernatur aliquam repellendus ullam est beatae molestias voluptate corporis iusto, similique id, reiciendis soluta.',
    },
  ],
  '2': [
    {
      id: 1,
      author: 'Vasya',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, maiores quo? Harum debitis dolorum quam in aspernatur aliquam repellendus ullam est beatae molestias voluptate corporis iusto, similique id, reiciendis soluta.',
    },
    {
      id: 2,
      author: 'Vasya',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, maiores quo? Harum debitis dolorum quam in aspernatur aliquam repellendus ullam est beatae molestias voluptate corporis iusto, similique id, reiciendis soluta.',
    },
  ],
  '3': [
    {
      id: 1,
      author: 'Vasya',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, maiores quo? Harum debitis dolorum quam in aspernatur aliquam repellendus ullam est beatae molestias voluptate corporis iusto, similique id, reiciendis soluta.',
    },
    {
      id: 2,
      author: 'Vasya',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, maiores quo? Harum debitis dolorum quam in aspernatur aliquam repellendus ullam est beatae molestias voluptate corporis iusto, similique id, reiciendis soluta.',
    },
    {
      id: 3,
      author: 'Vasya',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, maiores quo? Harum debitis dolorum quam in aspernatur aliquam repellendus ullam est beatae molestias voluptate corporis iusto, similique id, reiciendis soluta.',
    },
  ],
}
