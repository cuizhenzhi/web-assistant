// ==UserScript==
// @name         网页注解工具
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  网页标注工具
// @match        *://*/*
// @resource     vue https://unpkg.com/vue@3/dist/vue.global.js
// @resource     tailwindcss https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

(async function() {
  'use strict';

  function delay(duration){
    return new Promise(resolve=>{
      setTimeout(resolve, duration*1000);
    })
  }
  await delay(5);
  // 创建Vue应用容器
  const app = document.createElement('div');
  document.body.appendChild(app);
  let localVue = window.Vue, newVue;
  console.log(localVue, newVue);

  // 添加Tailwind CSS
  const tailwindCSS = GM_getResourceText('tailwindcss');
  GM_addStyle(tailwindCSS);
  const vuejs = GM_getResourceText('vue');
  const vuescript = document.createElement('script');
  vuescript.innerHTML = vuejs;
  //console.log(document, document.body, document.body.appendChild)
  document.body.appendChild(vuescript);
  newVue = window.Vue;
  //console.log(tailwindCSS.substr(0, 100), vuejs.substr(0, 100), vuescript)
  //console.log(localVue, newVue, Vue);

  const { createApp, ref, reactive } = Vue;

  const component = {
    template: `
          <div class="fixed bottom-4 right-4 z-50">
            <!-- 主悬浮按钮 -->
            <button
              @click="togglePanel"
              class="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </button>

            <!-- 注解面板 -->
            <div v-if="isOpen" class="mt-2 w-80 bg-white rounded-lg shadow-xl border p-4 space-y-4">
              <h2 class="text-xl font-bold text-gray-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                网页注解工具
              </h2>

              <!-- 主题输入 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-blue-500">
                    <path d="M2 3l20 0"></path>
                    <path d="M5 3v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-16"></path>
                    <path d="M9 7l6 0"></path>
                    <path d="M9 11l6 0"></path>
                  </svg>
                  主题
                </label>
                <input
                  type="text"
                  v-model="theme"
                  placeholder="输入网页主题"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <!-- 关键词输入 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-green-500">
                    <path d="M7.5 3.5l0 8l5 5l5 -5l0 -8z"></path>
                    <path d="M3 7l4.5 0"></path>
                    <path d="M19 7l2 0"></path>
                  </svg>
                  关键词
                </label>
                <input
                  type="text"
                  v-model="keywords"
                  placeholder="输入关键词，用逗号分隔"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>

              <!-- 笔记区域 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-purple-500">
                    <path d="M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4"></path>
                    <line x1="14.5" y1="5.5" x2="18.5" y2="9.5"></line>
                  </svg>
                  笔记
                </label>
                <textarea
                  v-model="notes.thinking"
                  placeholder="输入思考"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-2"
                  rows="3"
                ></textarea>
                <textarea
                  v-model="notes.comment"
                  placeholder="输入评论"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-2"
                  rows="3"
                ></textarea>
                <textarea
                  v-model="notes.summary"
                  placeholder="输入总结"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-2"
                  rows="3"
                ></textarea>
                <textarea
                  v-model="notes.question"
                  placeholder="输入提问"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-2"
                  rows="3"
                ></textarea>
              </div>

              <!-- 操作按钮 -->
              <div class="flex justify-between mt-4">
                <button
                  @click="saveAnnotation"
                  class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                    <path d="M15 11l -5 5l5 5"></path>
                    <path d="M12 3l0 12"></path>
                  </svg>
                  保存注解
                </button>
                <button
                  @click="closePanel"
                  class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-all"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        `,
    setup() {
      // 响应式状态
      const isOpen = ref(false)
      const theme = ref('')
      const keywords = ref('')
      const notes = reactive({
        thinking: '',
        comment: '',
        summary: '',
        question: ''
      })

      // 切换面板显示
      const togglePanel = () => {
        isOpen.value = !isOpen.value
      }

      // 关闭面板
      const closePanel = () => {
        isOpen.value = false
      }

      // 保存注解的方法
      const saveAnnotation = () => {
        console.log('Annotation saved:', {
          theme: theme.value,
          keywords: keywords.value,
          notes: { ...notes }
        })

        // 清空输入
        theme.value = ''
        keywords.value = ''
        notes.thinking = ''
        notes.comment = ''
        notes.summary = ''
        notes.question = ''

        // 关闭面板
        closePanel()
      }

      return {
        isOpen,
        theme,
        keywords,
        notes,
        togglePanel,
        closePanel,
        saveAnnotation
      }
    }
  };

  // 创建并挂载应用
  const vueApp = createApp(component);
  vueApp.mount(app);
})();