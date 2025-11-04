import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Artifact {
  id: string;
  title: string;
  museum: string;
  period: string;
  status: 'active' | 'review' | 'completed';
  volunteers: number;
  image: string;
  description: string;
  condition: string;
  task: string;
  taskType: 'restoration' | 'cataloging' | 'research';
  skillsNeeded: string[];
  progress: number;
}

interface VolunteerTask {
  id: string;
  artifactId: string;
  type: string;
  description: string;
  status: 'open' | 'in-progress' | 'completed';
  assignedTo?: string;
}

const artifacts: Artifact[] = [
  {
    id: '1',
    title: 'Древнегреческая амфора',
    museum: 'Государственный Эрмитаж',
    period: 'V век до н.э.',
    status: 'active',
    volunteers: 12,
    image: 'https://cdn.poehali.dev/projects/12112b27-cb6d-48ca-83e3-7cd1997b77e9/files/b6e0f7dd-958a-407e-a15e-656d7be95208.jpg',
    description: 'Краснофигурная амфора с изображением сцен из греческой мифологии',
    condition: 'Требуется идентификация фрагментов росписи',
    task: 'Помощь в атрибуции и датировке изображений',
    taskType: 'research',
    skillsNeeded: ['Античное искусство', 'Греческая мифология', 'Иконография'],
    progress: 65
  },
  {
    id: '2',
    title: 'Средневековый манускрипт',
    museum: 'Российская национальная библиотека',
    period: 'XIII век',
    status: 'active',
    volunteers: 8,
    image: 'https://cdn.poehali.dev/projects/12112b27-cb6d-48ca-83e3-7cd1997b77e9/files/24df0d21-674b-4838-824f-00ac55b0b9c0.jpg',
    description: 'Иллюминированная рукопись с золотым орнаментом',
    condition: 'Частичное выцветание текста и миниатюр',
    task: 'Расшифровка текста и описание декоративных элементов',
    taskType: 'cataloging',
    skillsNeeded: ['Палеография', 'Средневековая латынь', 'Кодикология'],
    progress: 40
  },
  {
    id: '3',
    title: 'Египетская стела',
    museum: 'ГМИИ им. А.С. Пушкина',
    period: 'Новое царство',
    status: 'review',
    volunteers: 15,
    image: 'https://cdn.poehali.dev/projects/12112b27-cb6d-48ca-83e3-7cd1997b77e9/files/278d1acf-3ca5-41ee-acd8-cb430d9abdbb.jpg',
    description: 'Известняковая стела с иероглифическими надписями',
    condition: 'Сохранность хорошая, требуется перевод',
    task: 'Перевод и интерпретация иероглифических текстов',
    taskType: 'research',
    skillsNeeded: ['Египтология', 'Иероглифика', 'История Древнего Египта'],
    progress: 85
  },
  {
    id: '4',
    title: 'Византийская икона',
    museum: 'Третьяковская галерея',
    period: 'XIV век',
    status: 'active',
    volunteers: 6,
    image: 'https://cdn.poehali.dev/projects/12112b27-cb6d-48ca-83e3-7cd1997b77e9/files/b6e0f7dd-958a-407e-a15e-656d7be95208.jpg',
    description: 'Икона Богоматери с младенцем, темперная живопись на дереве',
    condition: 'Повреждения красочного слоя, потемнение олифы',
    task: 'Документирование состояния сохранности и технологический анализ',
    taskType: 'restoration',
    skillsNeeded: ['Реставрация темперной живописи', 'Иконография', 'Византийское искусство'],
    progress: 20
  },
  {
    id: '5',
    title: 'Китайская фарфоровая ваза',
    museum: 'Музей Востока',
    period: 'Династия Цин, XVIII век',
    status: 'active',
    volunteers: 10,
    image: 'https://cdn.poehali.dev/projects/12112b27-cb6d-48ca-83e3-7cd1997b77e9/files/24df0d21-674b-4838-824f-00ac55b0b9c0.jpg',
    description: 'Фарфоровая ваза с подглазурной росписью кобальтом',
    condition: 'Множественные трещины и сколы',
    task: 'Классификация орнаментов и идентификация мастерской',
    taskType: 'cataloging',
    skillsNeeded: ['Китайское искусство', 'Керамика', 'Китайская иероглифика'],
    progress: 55
  },
  {
    id: '6',
    title: 'Древнерусская летопись',
    museum: 'Российская государственная библиотека',
    period: 'XV век',
    status: 'active',
    volunteers: 14,
    image: 'https://cdn.poehali.dev/projects/12112b27-cb6d-48ca-83e3-7cd1997b77e9/files/278d1acf-3ca5-41ee-acd8-cb430d9abdbb.jpg',
    description: 'Рукописный список летописи с миниатюрами',
    condition: 'Утраты листов, загрязнения, повреждения переплёта',
    task: 'Транскрипция текста и описание миниатюр',
    taskType: 'cataloging',
    skillsNeeded: ['Древнерусский язык', 'Палеография', 'История Руси'],
    progress: 30
  }
];

const museums = [
  { name: 'Государственный Эрмитаж', projects: 47, volunteers: 234 },
  { name: 'ГМИИ им. А.С. Пушкина', projects: 32, volunteers: 189 },
  { name: 'Российская национальная библиотека', projects: 28, volunteers: 156 },
  { name: 'Государственный исторический музей', projects: 21, volunteers: 98 },
  { name: 'Третьяковская галерея', projects: 18, volunteers: 87 },
  { name: 'Музей Востока', projects: 15, volunteers: 72 }
];

export default function Index() {
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [activeTab, setActiveTab] = useState('projects');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'review': return 'На проверке';
      case 'completed': return 'Завершён';
      default: return status;
    }
  };

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'restoration': return 'Hammer';
      case 'cataloging': return 'BookOpen';
      case 'research': return 'Search';
      default: return 'Circle';
    }
  };

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case 'restoration': return 'bg-orange-100 text-orange-800';
      case 'cataloging': return 'bg-blue-100 text-blue-800';
      case 'research': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Museum" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-primary font-serif">Музейные сокровища: Спасение и сохранение</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <button 
                onClick={() => setActiveTab('projects')}
                className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'projects' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Проекты
              </button>
              <button 
                onClick={() => setActiveTab('volunteers')}
                className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'volunteers' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Волонтёры
              </button>
              <button 
                onClick={() => setActiveTab('museums')}
                className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'museums' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Музеи
              </button>
              <button 
                onClick={() => setActiveTab('about')}
                className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'about' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                О платформе
              </button>
            </nav>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Icon name="LogIn" size={16} className="mr-2" />
                Войти
              </Button>
              <Button size="sm">
                <Icon name="UserPlus" size={16} className="mr-2" />
                Регистрация
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeTab === 'projects' && (
          <>
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-5xl font-bold mb-4 font-serif text-primary">
                Помогите сохранить историю
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Присоединяйтесь к глобальному сообществу волонтёров, помогающих музеям 
                каталогизировать, изучать и реставрировать артефакты
              </p>
            </div>

            <div className="flex gap-4 mb-8 justify-center flex-wrap">
              <Button variant="outline" className="gap-2">
                <Icon name="Filter" size={16} />
                Все категории
              </Button>
              <Button variant="outline" className="gap-2">
                <Icon name="Clock" size={16} />
                По периоду
              </Button>
              <Button variant="outline" className="gap-2">
                <Icon name="MapPin" size={16} />
                По музею
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {artifacts.map((artifact, index) => (
                <Card 
                  key={artifact.id} 
                  className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedArtifact(artifact)}
                >
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <img 
                      src={artifact.image} 
                      alt={artifact.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Badge className={getStatusColor(artifact.status)}>
                        {getStatusText(artifact.status)}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-start gap-2 mb-2">
                      <div className={`p-2 rounded-lg ${getTaskTypeColor(artifact.taskType)}`}>
                        <Icon name={getTaskTypeIcon(artifact.taskType) as any} size={20} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="font-serif text-xl">{artifact.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className="flex flex-col gap-1">
                      <span className="flex items-center gap-2">
                        <Icon name="Building2" size={14} />
                        {artifact.museum}
                      </span>
                      <span className="flex items-center gap-2">
                        <Icon name="Calendar" size={14} />
                        {artifact.period}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {artifact.skillsNeeded.slice(0, 2).map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Прогресс</span>
                          <span>{artifact.progress}%</span>
                        </div>
                        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-full transition-all"
                            style={{ width: `${artifact.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Users" size={16} />
                          <span>{artifact.volunteers} волонтёров</span>
                        </div>
                        <Button size="sm" variant="ghost">
                          Подробнее
                          <Icon name="ArrowRight" size={16} className="ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-accent/30 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 font-serif">Станьте волонтёром</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Зарегистрируйтесь как волонтёр и начните помогать музеям прямо сейчас. 
                Не требуется специального образования — каждый может внести свой вклад
              </p>
              <Button size="lg">
                <Icon name="Heart" size={20} className="mr-2" />
                Присоединиться
              </Button>
            </div>
          </>
        )}

        {activeTab === 'volunteers' && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 font-serif text-center">Сообщество волонтёров</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200">
                <CardHeader>
                  <Icon name="Users" size={48} className="text-blue-600 mb-4" />
                  <CardTitle className="font-serif text-3xl">2,847</CardTitle>
                  <CardDescription>Активных волонтёров</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200">
                <CardHeader>
                  <Icon name="CheckCircle" size={48} className="text-green-600 mb-4" />
                  <CardTitle className="font-serif text-3xl">1,234</CardTitle>
                  <CardDescription>Завершённых задач</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200">
                <CardHeader>
                  <Icon name="Globe" size={48} className="text-purple-600 mb-4" />
                  <CardTitle className="font-serif text-3xl">87</CardTitle>
                  <CardDescription>Стран участвуют</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Как стать волонтёром</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon name="UserPlus" size={32} className="text-primary" />
                    </div>
                    <h3 className="font-semibold">1. Регистрация</h3>
                    <p className="text-sm text-muted-foreground">
                      Создайте профиль и укажите свои интересы и навыки
                    </p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon name="Search" size={32} className="text-primary" />
                    </div>
                    <h3 className="font-semibold">2. Выбор проекта</h3>
                    <p className="text-sm text-muted-foreground">
                      Найдите задачу, соответствующую вашим знаниям
                    </p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon name="Heart" size={32} className="text-primary" />
                    </div>
                    <h3 className="font-semibold">3. Помощь музеям</h3>
                    <p className="text-sm text-muted-foreground">
                      Вносите вклад в сохранение культурного наследия
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif text-2xl">Типы задач для волонтёров</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg hover:border-primary transition-colors">
                    <Icon name="Hammer" size={24} className="text-primary mb-2" />
                    <h4 className="font-semibold mb-2">Реставрация</h4>
                    <p className="text-sm text-muted-foreground">
                      Документирование повреждений, консультации по методам восстановления
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg hover:border-primary transition-colors">
                    <Icon name="BookOpen" size={24} className="text-primary mb-2" />
                    <h4 className="font-semibold mb-2">Каталогизация</h4>
                    <p className="text-sm text-muted-foreground">
                      Описание артефактов, создание метаданных, систематизация
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg hover:border-primary transition-colors">
                    <Icon name="Search" size={24} className="text-primary mb-2" />
                    <h4 className="font-semibold mb-2">Исследования</h4>
                    <p className="text-sm text-muted-foreground">
                      Атрибуция, датировка, перевод текстов, искусствоведческий анализ
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-8">
              <Button size="lg">
                <Icon name="UserPlus" size={20} className="mr-2" />
                Зарегистрироваться как волонтёр
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'museums' && (
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 font-serif text-center">Музеи-участники</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {museums.map((museum, index) => (
                <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <CardTitle className="font-serif flex items-center gap-2">
                      <Icon name="Building2" size={24} className="text-primary" />
                      {museum.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Активных проектов:</span>
                        <Badge variant="secondary">{museum.projects}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Волонтёров:</span>
                        <Badge variant="outline">{museum.volunteers}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                <Icon name="Building" size={20} className="mr-2" />
                Зарегистрировать музей
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-4xl font-bold mb-8 font-serif text-center">О платформе</h2>
            <div className="prose prose-lg max-w-none">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Наша миссия</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Музейные сокровища: Спасение и сохранение — это глобальная платформа, объединяющая музеи и волонтёров 
                    для совместной работы по сохранению культурного наследия. Мы создаём цифровые 
                    копии артефактов и привлекаем экспертов со всего мира для их изучения и реставрации.
                  </p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Icon name="Users" size={32} className="text-primary mb-2" />
                    <CardTitle className="font-serif">Для волонтёров</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Вносите вклад в сохранение истории, работая с уникальными артефактами
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Icon name="Building2" size={32} className="text-primary mb-2" />
                    <CardTitle className="font-serif">Для музеев</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Получайте помощь в каталогизации, изучении и реставрации коллекций
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Icon name="Globe" size={32} className="text-primary mb-2" />
                    <CardTitle className="font-serif">Для всех</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Открытый доступ к оцифрованным артефактам и результатам исследований
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </main>

      <Dialog open={!!selectedArtifact} onOpenChange={() => setSelectedArtifact(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedArtifact && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-3xl">{selectedArtifact.title}</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Описание</TabsTrigger>
                  <TabsTrigger value="tasks">Задачи</TabsTrigger>
                  <TabsTrigger value="annotation">Разметка</TabsTrigger>
                  <TabsTrigger value="discussion">Обсуждение</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4">
                  <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={selectedArtifact.image} 
                      alt={selectedArtifact.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Информация</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-muted-foreground">Музей:</span> {selectedArtifact.museum}</p>
                        <p><span className="text-muted-foreground">Период:</span> {selectedArtifact.period}</p>
                        <p><span className="text-muted-foreground">Статус:</span> {getStatusText(selectedArtifact.status)}</p>
                        <p><span className="text-muted-foreground">Волонтёры:</span> {selectedArtifact.volunteers}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Задача</h4>
                      <p className="text-sm text-muted-foreground mb-4">{selectedArtifact.task}</p>
                      <h4 className="font-semibold mb-2">Состояние</h4>
                      <p className="text-sm text-muted-foreground">{selectedArtifact.condition}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Необходимые навыки</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedArtifact.skillsNeeded.map((skill, i) => (
                        <Badge key={i} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Прогресс проекта</h4>
                      <span className="text-sm text-muted-foreground">{selectedArtifact.progress}%</span>
                    </div>
                    <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-full transition-all"
                        style={{ width: `${selectedArtifact.progress}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Описание</h4>
                    <p className="text-sm text-muted-foreground">{selectedArtifact.description}</p>
                  </div>
                  <Button className="w-full">
                    <Icon name="Hand" size={20} className="mr-2" />
                    Присоединиться к проекту
                  </Button>
                </TabsContent>
                <TabsContent value="tasks" className="space-y-4">
                  <div className="space-y-3">
                    <Card>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">Идентификация мифологических сцен</CardTitle>
                            <CardDescription>Определить изображённые мифы и персонажей</CardDescription>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Открыта</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Icon name="Users" size={16} />
                            <span>3 волонтёра работают</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">Греческая мифология</Badge>
                            <Badge variant="outline" className="text-xs">Иконография</Badge>
                          </div>
                          <Button size="sm" className="w-full">
                            <Icon name="Plus" size={16} className="mr-2" />
                            Взять задачу
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">Анализ техники росписи</CardTitle>
                            <CardDescription>Описание красок и методов нанесения</CardDescription>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800">В работе</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Icon name="User" size={16} />
                            <span>Анна Петрова</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-xs">Керамика</Badge>
                            <Badge variant="outline" className="text-xs">Античное искусство</Badge>
                          </div>
                          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-full" style={{ width: '65%' }} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">Датировка по стилю</CardTitle>
                            <CardDescription>Уточнение периода создания артефакта</CardDescription>
                          </div>
                          <Badge className="bg-gray-100 text-gray-800">Завершена</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <Icon name="CheckCircle" size={16} />
                            <span>Проверено экспертом музея</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Результат: V век до н.э., раннеклассический период
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="annotation" className="space-y-4">
                  <ArtifactAnnotation image={selectedArtifact.image} />
                </TabsContent>
                <TabsContent value="discussion">
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="MessageSquare" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Обсуждение будет доступно после присоединения к проекту</p>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      <footer className="border-t mt-24 py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="mb-2">© 2024 Музейные сокровища: Спасение и сохранение. Сохраняем культурное наследие вместе.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">Контакты</a>
            <a href="#" className="hover:text-primary transition-colors">Документация</a>
            <a href="#" className="hover:text-primary transition-colors">API</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ArtifactAnnotation({ image }: { image: string }) {
  const [markers, setMarkers] = useState<Array<{ x: number; y: number; id: string; comment: string }>>([]);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newMarker = {
      x,
      y,
      id: Date.now().toString(),
      comment: ''
    };
    
    setMarkers([...markers, newMarker]);
    setSelectedMarker(newMarker.id);
  };

  const saveComment = () => {
    if (selectedMarker && newComment.trim()) {
      setMarkers(markers.map(m => 
        m.id === selectedMarker ? { ...m, comment: newComment } : m
      ));
      setNewComment('');
      setSelectedMarker(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-accent/20 p-4 rounded-lg">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <Icon name="Info" size={16} />
          Инструкция
        </h4>
        <p className="text-sm text-muted-foreground">
          Кликните на изображение, чтобы добавить маркер. Добавьте комментарий к отмеченной области.
        </p>
      </div>

      <div className="relative border rounded-lg overflow-hidden bg-muted" style={{ minHeight: '400px' }}>
        <div 
          className="relative cursor-crosshair"
          onClick={handleImageClick}
        >
          <img 
            src={image} 
            alt="Артефакт для разметки"
            className="w-full h-auto"
          />
          {markers.map((marker) => (
            <div
              key={marker.id}
              className="absolute w-8 h-8 -ml-4 -mt-4 cursor-pointer"
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedMarker(marker.id);
                setNewComment(marker.comment);
              }}
            >
              <div className="w-full h-full bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse flex items-center justify-center text-white text-xs font-bold">
                {markers.findIndex(m => m.id === marker.id) + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedMarker && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Добавить комментарий</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              className="w-full min-h-[100px] p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Опишите особенности отмеченной области..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={saveComment}>
                <Icon name="Check" size={16} className="mr-2" />
                Сохранить
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedMarker(null);
                  setNewComment('');
                }}
              >
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {markers.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold">Маркеры ({markers.length})</h4>
          {markers.map((marker, index) => (
            <Card key={marker.id} className="p-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  {marker.comment ? (
                    <p className="text-sm">{marker.comment}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">Без комментария</p>
                  )}
                </div>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => setMarkers(markers.filter(m => m.id !== marker.id))}
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}