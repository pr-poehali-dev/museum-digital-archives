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
    task: 'Помощь в атрибуции и датировке изображений'
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
    task: 'Расшифровка текста и описание декоративных элементов'
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
    task: 'Перевод и интерпретация иероглифических текстов'
  }
];

const museums = [
  { name: 'Государственный Эрмитаж', projects: 47 },
  { name: 'ГМИИ им. А.С. Пушкина', projects: 32 },
  { name: 'Российская национальная библиотека', projects: 28 },
  { name: 'Государственный исторический музей', projects: 21 }
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Museum" size={32} className="text-primary" />
              <h1 className="text-3xl font-bold text-primary font-serif">Цифровой Архив</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <button 
                onClick={() => setActiveTab('projects')}
                className={`text-sm font-medium transition-colors hover:text-primary ${activeTab === 'projects' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                Проекты
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
                    <Badge className={`absolute top-4 right-4 ${getStatusColor(artifact.status)}`}>
                      {getStatusText(artifact.status)}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl">{artifact.title}</CardTitle>
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
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Активных проектов:</span>
                      <Badge variant="secondary">{museum.projects}</Badge>
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
                    Цифровой Архив — это глобальная платформа, объединяющая музеи и волонтёров 
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
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Описание</TabsTrigger>
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
                    <h4 className="font-semibold mb-2">Описание</h4>
                    <p className="text-sm text-muted-foreground">{selectedArtifact.description}</p>
                  </div>
                  <Button className="w-full">
                    <Icon name="Hand" size={20} className="mr-2" />
                    Присоединиться к проекту
                  </Button>
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
          <p className="mb-2">© 2024 Цифровой Архив. Сохраняем культурное наследие вместе.</p>
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