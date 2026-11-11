import { StudyCanvas } from "./StudyLayout";
import { Grid3X3, FlaskConical, Search, Bell, CircleHelp, ChevronDown, ChevronUp, CalendarDays, ListFilter, Heart, ArrowUpRight, ArrowDownLeft, Rocket, Check, Hexagon } from "lucide-react";
import "./ExperimentStudy.css";

const reports = [
  ["Показ баннера на главной МБ", "Вывод", "Главная МБ", 23, 1, true],
  ["Название отчета и эксперимента", "Проведение", "Дебетовая карта", 8, 2, true],
  ["Premium на экране спасибо /mobile-operator/mgm/", "Анализ", "Вклады", 12, 32],
  ["Название отчета и эксперимента", "Пауза", "Город", 2, 4],
  ["Название отчета и эксперимента", "Обработка", "Город", 3, 5],
  ["Premium на экране спасибо /mobile-operator/mgm/", "Анализ", "Вклады", 25, 15],
  ["Premium на экране спасибо /mobile-operator/mgm/", "Анализ", "Главная МБ", 22, 9],
  ["Premium на экране спасибо /mobile-operator/mgm/", "Анализ", "Главная МБ", 73, 0],
  ["Название отчета и эксперимента", "Обработка", "Дебетовая карта", 34, 7],
  ["Premium на экране спасибо /mobile-operator/mgm/", "Черновик", "Главная МБ", 8, 1],
] as const;
const colors: Record<string,string> = { Вывод: "#64ce86", Проведение: "#7baaff", Анализ: "#bd93d5", Пауза: "#ee9685", Обработка: "#eec16c", Черновик: "#9ba8b8" };
function Filter({label,calendar=false}:{label:string;calendar?:boolean}) { return <span className="experiment-control experiment-filter">{label}{calendar?<CalendarDays size={19}/>:<ChevronDown size={18}/>}</span>; }
export default function ExperimentStudy() {
  return <StudyCanvas className="experiment-stage" label="Forma experiment analytics interface study in a dark theme">
    <div className="experiment-shell">
      <header className="experiment-topbar">
        <span className="experiment-control experiment-apps"><Grid3X3 size={17}/></span>
        <span className="experiment-brand"><Hexagon size={24}/><strong>Forma</strong></span>
        <span className="experiment-control experiment-new"><FlaskConical size={17}/>Новый эксперимент</span>
        <span className="experiment-control experiment-tab experiment-tab-active">Эксперименты</span><span className="experiment-control experiment-tab">Поверхности</span>
        <div className="experiment-topbar-end"><span className="experiment-control experiment-docs">Документация</span><span className="experiment-control experiment-notification"><Bell size={17}/><i/></span><span className="experiment-control"><CircleHelp size={17}/></span><span className="experiment-control experiment-account">T</span></div>
      </header>
      <div className="experiment-body">
        <section className="experiment-reports">
          <div className="experiment-toolbar"><span className="experiment-control experiment-search"><Search size={17}/>Поиск по названию отчета</span><span className="experiment-segment"><span className="experiment-control experiment-selected">Все</span><span className="experiment-control">Прокрашенные</span></span><span className="experiment-control experiment-sort">Дата расчета<ListFilter size={17}/></span></div>
          <div className="experiment-rows">{reports.map(([name,status,product,positive,negative,pinned],index)=><div className="experiment-row" key={index}><span className="experiment-report-name">{name}{pinned&&<Rocket size={16} className="experiment-rocket"/>}</span><span><span className="experiment-status" style={{"--status-color":colors[status]} as React.CSSProperties}><i/>{status}</span></span><span className="experiment-product">{product}</span><span className="experiment-number"><ArrowUpRight size={17}/>{positive}</span><span className="experiment-number experiment-negative"><ArrowDownLeft size={17}/>{negative}</span></div>)}</div>
        </section>
        <aside className="experiment-aside">
          <section className="experiment-presets"><h3>Пресеты</h3><p>Сохрани текущие фильтры и сортировку<br/>для быстрого доступа</p><span className="experiment-control experiment-save"><Heart size={17} fill="currentColor"/>Сохранить в пресет</span></section>
          <section className="experiment-filter-panel"><h3>Фильтры</h3><div className="experiment-filter-group"><Filter label="Статус"/><Filter label="Период проведения" calendar/></div><div className="experiment-filter-group"><Filter label="Продукт"/><Filter label="Автор"/><Filter label="Прокрашенные метрики"/></div><div className="experiment-extra"><h3>Дополнительно<ChevronUp size={17}/></h3><span className="experiment-control experiment-significance"><span><small>Уровень значимости, α</small>0,01</span><ChevronDown size={17}/></span><span className="experiment-control experiment-toggle-row"><span className="experiment-toggle"><Check size={11}/><i/></span><span>Поправка на множественное<br/>сравнение</span></span><span className="experiment-control experiment-toggle-row"><span className="experiment-toggle"><Check size={11}/><i/></span><span>Пройдены проверки</span></span></div></section>
        </aside>
      </div>
    </div>
  </StudyCanvas>;
}
