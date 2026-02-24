import { CalendarDays, Ellipsis, Folder } from "lucide-react";

const NotesComponent = () => {
  return (
    <section className="p-12 w-full overflow-y-auto scrollbar">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-medium">
          Reflection on the Month of June
        </h1>
        <button className="p-1 border rounded-full border-background-700 text-background-700 cursor-pointer">
          <Ellipsis />
        </button>
      </div>
      <div className="flex items-center gap-20 pt-10 pb-4">
        <div className="text-background-700 flex items-center gap-5">
          <CalendarDays size={20} />
          <h3 className="text-xs font-semibold tracking-wider">Date</h3>
        </div>
        <p className="text-white text-sm font-medium underline ">20/10/2022</p>
      </div>
      <hr className="border-0.1 border-background-700/40" />
      <div className="flex items-center gap-18 pb-10 pt-4">
        <div className="text-background-700 flex items-center gap-5">
          <Folder size={20} />
          <h3 className="text-xs font-semibold tracking-wider">Folder</h3>
        </div>
        <p className="text-white text-sm font-medium underline">personal</p>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia,
        praesentium architecto commodi impedit magnam voluptates rem? Officiis
        soluta fuga quae aliquid rem laborum quam voluptas, similique natus,
        explicabo nemo earum. Voluptatum, maiores temporibus? Recusandae impedit
        esse similique libero fugiat nisi doloribus assumenda. Autem delectus
        asperiores ut fugiat aliquam perspiciatis, doloremque aperiam neque ab.
        Nulla doloribus fuga itaque fugiat distinctio consectetur. Facilis velit
        mollitia et quia iusto fugiat vitae quaerat inventore quam harum
        doloremque soluta, reprehenderit, consequuntur quidem aperiam,
        temporibus repellendus eveniet dolores veniam adipisci rem ut? Voluptate
        impedit ducimus repellendus. Veniam sed voluptatem porro architecto, non
        eos possimus perferendis facilis accusantium voluptate. Rerum,
        recusandae eveniet! Delectus quisquam sit deserunt incidunt, quae cum
        voluptatum, repudiandae assumenda voluptatem enim alias ad ipsam.
        Mollitia, et perferendis eius quasi suscipit nulla consequatur, porro
        velit quis earum maiores eos recusandae, tempora quaerat nostrum dolorum
        corrupti facilis enim? Quod ipsum rerum commodi. Tenetur aut quo dicta.
        Consectetur culpa adipisci ducimus ipsa omnis maxime cumque molestiae
        ipsam enim recusandae fugit eveniet pariatur optio et libero quis veniam
        quibusdam voluptates praesentium odit, reprehenderit cum. Magnam
        explicabo soluta at. Nisi molestiae repudiandae optio quod obcaecati ad
        fugiat consectetur quidem minus. Reprehenderit perspiciatis eaque amet
        corporis tempore debitis voluptatibus autem consequuntur natus
        laudantium at voluptatem dolor assumenda nesciunt, repudiandae nisi.
        Ducimus corrupti ipsam aperiam accusamus voluptatum eaque neque labore?
        Dicta, magnam minus voluptates dolor vitae perferendis optio accusantium
        tempore deserunt velit ratione facere quidem amet consectetur at!
        Aliquam, ratione expedita. Eos voluptate molestiae eius eligendi ratione
        quam laudantium vitae odio numquam similique fuga, est asperiores
        blanditiis reiciendis excepturi expedita natus voluptatibus quo voluptas
        totam enim consectetur placeat. Blanditiis, quae dolor. Reprehenderit
        est, totam, laboriosam facilis perferendis et nam nobis nisi numquam
        cupiditate explicabo voluptate! Qui ad nam dolorem optio veniam modi at,
        tenetur eveniet maxime ut sapiente earum consectetur mollitia? A,
        provident iste at rem et vero dolorum officiis facilis dicta! Ab commodi
        illo itaque id iure, amet reprehenderit deleniti dolore laboriosam dolor
        earum voluptates, numquam error nobis quibusdam aspernatur. Distinctio
        nisi quis natus id dolores sequi quasi! Quidem cum est provident earum
        ipsum? Nam voluptatum ratione officia dolorem magnam voluptates facilis
        deserunt molestiae, quam impedit, dolorum adipisci? Illum, sapiente!
        Vero esse ipsum fugiat velit mollitia a numquam voluptatum debitis
        accusantium ratione obcaecati autem quam vitae, enim laudantium eos nam
        natus! Illum nostrum vel tempora eius ducimus in nobis inventore!
        Tempore hic omnis libero facilis ea, corporis, maxime ipsam
        necessitatibus fuga quisquam blanditiis delectus. Ipsum facere a laborum
        veritatis nam. Unde consequatur, nesciunt exercitationem ea velit
        impedit eos minima totam. Eligendi totam, incidunt aut dicta facere
        laboriosam vitae reprehenderit tenetur assumenda consequuntur sit optio
        nulla non molestiae iure, consequatur ea sint architecto est expedita
        soluta sequi voluptate atque iusto. Nam? At quo iure odit ut ratione
        perferendis atque nobis tenetur, illo necessitatibus sapiente incidunt
        voluptates ex alias obcaecati, unde facilis dolores ipsam non eos quis.
        Dicta placeat eveniet voluptates iusto? Explicabo impedit nihil, alias
        maxime maiores inventore sed dignissimos ea laudantium vel fugiat
        voluptas esse mollitia itaque exercitationem omnis optio iure, ad culpa
        facilis aperiam. In eaque quis provident? Autem? Architecto, magnam, et
        exercitationem dolore a cum dignissimos quos, illum odit atque quo
        assumenda repellat esse nesciunt ipsum praesentium ab quidem id.
        Facilis, blanditiis minus dolores ut et sapiente amet? Fuga dolore
        aliquid ipsa cum sapiente distinctio cupiditate laborum. Voluptas sint
        voluptatem nam hic tempore tempora! Velit dolore quasi maiores
        consectetur nisi illo debitis cum sint vero aspernatur, earum assumenda!
        Nobis accusamus, dolorum deleniti nesciunt expedita voluptatibus vero.
        Necessitatibus debitis sunt nemo accusamus voluptate assumenda, sint
        modi vitae consequatur dolores. Quisquam saepe dicta placeat, veritatis
        hic in. Repudiandae, error expedita.
      </p>
    </section>
  );
};

export default NotesComponent;
