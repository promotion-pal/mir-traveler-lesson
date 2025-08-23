import { connectivityService } from '@/features/api/site';
import { SupportForm } from '@/features/form/common';
import { app } from '@/shared/config/app';
import { APP_ROUTES } from '@/shared/config/path';
import ImgBgLandscape from '@/shared/img/site/landscape.png';
import ImgSmile from '@/shared/img/site/smile.png';
import { AdditionalInfoCart } from '@/widgets/site/contact';
import Image from 'next/image';

export default async function ContactPage() {
  const dataContact = await connectivityService.getContacts();
  const contact = dataContact[0];

  return (
    <main className='mb-20 mt-20 md:mt-40'>
      <div className='container'>
        <p className='text-xl font-semibold'>Контакты</p>

        <div className='mt-10 flex flex-col space-y-5'>
          <section className='grid gap-5 md:grid-cols-[50%_50%]'>
            <div className='grid min-h-[200px] items-center rounded-lg bg-blue md:grid-cols-[40%_60%]'>
              <div className='space-y-4 px-7'>
                <p className='text-3xl font-medium'>{contact.email}</p>
                <p className='text-3xl font-normal'>{contact.phone}</p>
              </div>

              <div className='relative hidden h-full w-full self-end'>
                <div className='absolute bottom-0 right-0 h-[80%] w-full'>
                  <Image
                    src={ImgBgLandscape}
                    alt='Фоновое изображение'
                    fill
                    className='object-contain object-bottom'
                  />
                </div>
              </div>
            </div>

            <div className='space-y-2'>
              <AdditionalInfoCart
                title='Стать партнёром'
                link={APP_ROUTES.HOME.BECOME_PARTNER}
                description={[
                  'Мы предлагаем лучшие условия и поддержку для вашего бизнеса.',
                ]}
              />

              <AdditionalInfoCart
                title='Служба поддержки'
                description={['Пн-Пт 9.00–19.00', 'Сб-Вс выходной']}
                link={APP_ROUTES.HOME.CONTACT}
              />
            </div>
          </section>

          <section className='space-y-10 sm:flex sm:bg-gray-100'>
            <div className='relative h-[500px] w-[350px] overflow-hidden rounded-xl'>
              <Image fill src={ImgSmile} alt='smile' className='object-cover' />

              <p className='absolute bottom-3 left-[50%] w-10/12 -translate-x-1/2 text-3xl font-semibold text-white'>
                Планируйте впечатления вместе с {app.siteName}
              </p>
            </div>

            <div className='mx-auto rounded-lg bg-gray-100 px-3 py-20 md:max-w-[50%]'>
              <p className='text-2xl font-medium'>Есть вопросы?</p>

              <p className='text-lg'>
                Напишите нам и мы свяжемся с вами в ближайшее время!
              </p>

              <SupportForm />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
