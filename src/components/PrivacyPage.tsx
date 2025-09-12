import { Link } from 'react-router-dom';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif mb-8 text-center">Политика обработки персональных данных</h1>
        <div className="space-y-6 prose prose-invert max-w-none">
          <ol className="list-decimal space-y-4 pl-6">
            <li>
              <strong>Общие положения</strong>
              <p>Настоящая Политика определяет порядок обработки и защиты персональных данных, которые могут обрабатываться при использовании сайта endofsummer.fun.</p>
              <p>Оператором персональных данных является ООО “Конец лета”, ОГРН 1246600054601, ИНН 6679179711</p>
            </li>
            <li>
              <strong>Персональные данные, которые мы можем получать</strong>
              <p>Мы не осуществляем сбор и обработку персональных данных пользователей на сайте.</p>
              <p>Автоматически могут фиксироваться технические данные: IP-адрес, информация о браузере, дате и времени обращения. Указанные данные обрабатываются автоматически хостинг-провайдером GitHub Pages исключительно в целях функционирования и обеспечения безопасности сайта.</p>
            </li>
            <li>
              <strong>Цели обработки</strong>
              <p>Технические данные используются для:</p>
              <ul className="list-disc space-y-1 pl-6 mt-2">
                <li>поддержания работоспособности сайта;</li>
                <li>защиты от несанкционированных действий.</li>
              </ul>
            </li>
            <li>
              <strong>Передача третьим лицам</strong>
              <p>Мы не передаём персональные данные третьим лицам. Техническая информация обрабатывается хостинг-провайдером GitHub. </p>
            </li>
            <li>
              <strong>Хранение и защита данных</strong>
              <p>Технические данные хранятся ограниченное время в журналах сервера и защищены средствами, предоставляемыми провайдером хостинга.</p>
            </li>
            <li>
              <strong>Контактная информация</strong>
              <p>По вопросам, связанным с обработкой персональных данных, можно обратиться:</p>
              <p>E-mail: konetzleta@gmail.com</p>
            </li>
          </ol>
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-mono text-sm tracking-wide rounded-full transition-colors duration-200"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}