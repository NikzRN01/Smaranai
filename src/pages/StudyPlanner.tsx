tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const StudyPlannerPage = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [chapterName, setChapterName] = useState('');
  const [description, setDescription] = useState('');

  const subjects = ['Mathematics', 'English', 'Science', 'Hindi', 'Gujarati', 'Grammar'];
  
  const handleCreatePlan = () => {
    console.log('Creating study plan...');
    console.log('Subject:', selectedSubject);
    console.log('Chapter Name:', chapterName);
    console.log('Description:', description);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <section className="container mx-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <Button variant="link" className="mb-4 w-fit text-white hover:text-blue-400" onClick={() => navigate(-1)}>
              ← Back
            </Button>
          {/* Main Heading */}
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white text-shadow-lg">Personalized Study Planner</h1>
            <p className="text-white text-xl md:text-2xl mt-4 text-shadow-lg">
              Generate a tailored study plan to achieve your academic goals.
            </p>
          </div>

          {/* Form Section */}
          <section className="bg-gray-800 rounded-lg shadow-lg p-6 md:p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium text-white">
                  Select Subject
                </label>
                <Select onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white">
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject} className="text-white">
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="chapterName" className="block mb-2 text-sm font-medium text-white">
                  Chapter Name
                </label>
              <Input
                id="chapterName"
                type="text"
                placeholder="Enter chapter name"
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              </div>
              <div>
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">
                  Description
              </label>
              <Textarea
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              </div>
              <Button onClick={handleCreatePlan} className={cn("w-full bg-gradient-to-br from-purple-700 to-blue-700 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 outline outline-offset-2 outline-1 hover:outline-pink-400/50")}>Create Study Plan</Button>
            </div>
          </section>

          {/* Instructions Section */}
          <section className="bg-gray-800 rounded-lg p-6 md:p-8 shadow-lg text-white">
            <h2 className="text-3xl font-semibold mb-4 text-shadow-lg">How to Use the Study Planner</h2>
            <div className="space-y-2 text-white text-lg text-shadow-lg">
              <p>1. Select a subject from the dropdown.</p>
              <p>2. Enter the chapter name you want to study.</p>
              <p>3. Add a brief description of what you want to cover.</p>
              <p>4. Click the 'Create Study Plan' button.</p>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
};

export default StudyPlannerPage;