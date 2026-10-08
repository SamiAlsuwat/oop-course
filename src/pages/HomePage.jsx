import React from 'react';

const HomePage = ({ user, onNavigate, onLogout }) => {
  const weeks = [
    { week: 1, titleEn: "Basic Concepts of OOP", titleAr: "المفاهيم الأساسية للـ OOP", icon: "🎯" },
    { week: 2, titleEn: "Classes and Objects", titleAr: "الفئات والكائنات", icon: "📦" },
    { week: 3, titleEn: "Control Statements", titleAr: "عبارات التحكم", icon: "🔀" },
    { week: 4, titleEn: "Access Specifiers", titleAr: "محددات الوصول", icon: "🔐" },
    { week: 5, titleEn: "Constructor & Static", titleAr: "المُنشئ والمتغيرات الثابتة", icon: "🏗️" },
    { week: 6, titleEn: "Exception Handling", titleAr: "معالجة الاستثناءات", icon: "⚠️" },
    { week: 7, titleEn: "Inheritance", titleAr: "الوراثة", icon: "👨‍👦" },
    { week: 8, titleEn: "Polymorphism", titleAr: "تعدد الأشكال", icon: "🔄" },
  ];

  const completedWeeks = Object.entries(user.progress).filter(([key, val]) => val.completed && parseInt(key.replace('week', '')) <= 8).length;
  const progressPercent = Math.round((completedWeeks / 8) * 100);

  const getGradeColor = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'text-violet-400';
    if (grade === 'B+' || grade === 'B') return 'text-blue-400';
    if (grade === 'C+' || grade === 'C') return 'text-yellow-400';
    if (grade === 'D+' || grade === 'D') return 'text-orange-400';
    if (grade === 'F') return 'text-red-400';
    return 'text-slate-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-violet-900/30">
      <header className="bg-slate-800/80 backdrop-blur border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">OOP</span>
              </div>
              <div>
                <h1 className="text-white font-bold">Object Oriented Programming</h1>
                <p className="text-violet-300/70 text-xs font-arabic">البرمجة الشيئية</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => onNavigate('profile')} className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white font-bold text-sm">{user.studentName.charAt(0)}</div>
                <div className="text-left hidden sm:block">
                  <p className="text-white text-sm font-semibold">{user.studentName}</p>
                  <p className="text-slate-400 text-xs">{user.studentNumber}</p>
                </div>
              </button>
              <button onClick={onLogout} className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm">Logout</button>
            </div>
          </div>
        </div>
      </header>
    <div className="max-w-7xl mx-auto px-4 py-8">
    

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-slate-400 text-sm mb-2">Overall Progress | التقدم العام</h3>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-white">{progressPercent}%</span>
              <span className="text-slate-400 text-sm mb-1">{completedWeeks}/8 weeks</span>
            </div>
            <div className="mt-4 h-3 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet-500 to-violet-400 transition-all" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-slate-400 text-sm mb-2">Current Grade | الدرجة الحالية</h3>
            <div className="flex items-end gap-3">
              <span className={`text-4xl font-bold ${getGradeColor(user.overallGrade)}`}>{user.overallGrade}</span>
              <span className="text-slate-400 text-sm mb-1">{user.totalScore}% avg</span>
            </div>
            <p className="text-slate-500 text-xs mt-3">Based on completed exercises</p>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-slate-400 text-sm mb-2">Student Info | معلومات الطالب</h3>
            <div className="space-y-2">
              <div className="flex justify-between"><span className="text-slate-500 text-sm">Name:</span><span className="text-white text-sm">{user.studentName}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 text-sm">ID:</span><span className="text-white text-sm font-mono">{user.studentNumber}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 text-sm">Section:</span><span className="text-violet-400 text-sm">{user.sectionNumber}</span></div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">Course Weeks</h2>
          <p className="text-violet-300/70 font-arabic">أسابيع الدورة</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {weeks.map((week) => {
            const weekProgress = user.progress[`week${week.week}`];
            const isCompleted = weekProgress?.completed;
            const score = weekProgress?.score || 0;
            return (
              <div key={week.week} onClick={() => onNavigate(`week${week.week}`)} className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all hover:scale-[1.02] ${isCompleted ? 'bg-violet-900/20 border-violet-500/50' : 'bg-slate-700/30 border-slate-600 hover:border-violet-500/50'}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${isCompleted ? 'bg-violet-600' : 'bg-violet-700'}`}>{isCompleted ? '✓' : week.icon}</div>
                  <div className="flex-1">
                    <span className="text-xs text-violet-400 font-semibold">Week {week.week}</span>
                    <h4 className="text-white font-semibold text-sm">{week.titleEn}</h4>
                    <p className="text-violet-300/60 text-xs font-arabic">{week.titleAr}</p>
                  </div>
                </div>
                {isCompleted ? (
                  <div className="mt-3 flex items-center justify-between bg-slate-800/50 rounded-lg p-2">
                    <span className="text-violet-400 text-xs">Completed</span>
                    <span className={`font-bold text-sm ${score >= 90 ? 'text-violet-400' : score >= 75 ? 'text-blue-400' : score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>{score}%</span>
                  </div>
                ) : (
                  <div className="mt-3 text-center"><span className="text-slate-400 text-xs">Click to start →</span></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <footer className="py-6 text-center border-t border-slate-800 mt-8">
        <p className="text-slate-500 text-sm">Object Oriented Programming | Taif University | جامعة الطائف</p>
        <p className="text-slate-600 text-xs mt-2">College of Computers & Information Technology</p>
      </footer>
    </div>
  );
};

export default HomePage;
