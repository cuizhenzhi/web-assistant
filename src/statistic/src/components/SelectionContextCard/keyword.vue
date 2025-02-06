<template>
  <div class="keyword-container">
    <label class="keyword-label">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="label-icon">
        <path d="M7.5 3.5l0 8l5 5l5 -5l0 -8z"></path>
        <path d="M3 7l4.5 0"></path>
        <path d="M19 7l2 0"></path>
      </svg>
      {{ label }}
    </label>
    <div class="input-wrapper">
      <div class="keyword-input-container">
        <span
            v-for="(keyword, index) in keywords"
            :key="keyword.id"
            class="keyword-tag"
        >
          {{ keyword.name }}
          <button
              @click="removeKeyword(index)"
              class="remove-btn"
          >
            ×
          </button>
        </span>
        <input
            ref="keywordInput"
            type="text"
            v-model="inputValue"
            @focus="onfocus"
            @input="onInput"
            @blur="onBlur"
            @keydown.enter.prevent="addKeyword"
            @keydown.delete="handleDeleteKey"
            placeholder="输入关键词并按回车添加"
            class="keyword-input"
        />
      </div>
      <ul
          v-if="showSuggestions"
          class="suggestions-list"
      >
        <li
            v-for="suggestion in suggestions"
            :key="suggestion.id"
            @mousedown.prevent="selectSuggestion(suggestion)"
            @mouseenter="isInteractingWithSuggestions = true"
            @mouseleave="isInteractingWithSuggestions = false"
            class="suggestion-item"
        >
          {{ suggestion.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getAllKeywords, addKeyword} from "@/api/keyword";

export default {
  name: 'KeywordsInput',
  props: {
    label: {
      type: String,
      default: '关键词',
    },
    debounceTime: {
      type: Number,
      default: 300,
    }
  },
  data() {
    return {
      keywords: [],
      inputValue: '',
      suggestions: [],
      allkeywords: [],
      showSuggestions: false,
      debounceTimer: null,
      isInteractingWithSuggestions: false,  // 新增：追踪是否正在与建议列表交互
    };
  },
  async created() {
    this.updateAllKeywords();
  },
  methods: {
    async updateAllKeywords(){
      this.allkeywords = await getAllKeywords();
    },

    /**
     * 如果与已选关键词重复则忽略
     * 如果是备选则添加并更新
     * 如果是新的则增添
     */
    async addKeyword() {
      const trimmedValue = this.inputValue.trim();
      if (trimmedValue) {
        // console.log(this.keywords,trimmedValue);
        // 查找匹配的关键词对象
        const matchedKeyword = this.allkeywords.find(
            keyword => keyword.name === trimmedValue
        );
        if(matchedKeyword && this.keywords.some(k => k.id === matchedKeyword.id)){
          return;
        }
        if (matchedKeyword) {
          this.keywords.push(matchedKeyword);
          this.inputValue = '';
        }
        else{
          const res = await addKeyword(trimmedValue)
          this.keywords.push(res[0]);
          this.inputValue = '';
          await this.updateAllKeywords();
        }
        this.$emit('update:keywords', this.keywords);
      }
    },
    removeKeyword(index) {
      const deleted = this.keywords.splice(index, 1);
      this.$emit('delete:keywords', deleted);
    },
    handleDeleteKey() {
      // 如果输入为空且按下删除键，则删除最后一个关键词
      if (this.inputValue === ''
          && this.keywords.length > 0) {
        const deleted = this.keywords.pop();
        this.$emit('delete:keywords', deleted);
      }
    },
    onInput() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.fetchSuggestions(this.inputValue);
      }, this.debounceTime);
    },
    onfocus() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.fetchSuggestions(this.inputValue);
      }, this.debounceTime);
    },
    onBlur() {
      if (!this.isInteractingWithSuggestions) {
        this.showSuggestions = false;
      }
    },
    fetchSuggestions(query) {
      if (!query) {
        this.suggestions = this.allkeywords.filter(
            keyword => !this.keywords.some(k => k.id === keyword.id)
        );
        this.showSuggestions = true;
        return;
      }

      try {
        this.suggestions = this.allkeywords.filter(
            keyword =>
                keyword.name.includes(query) &&
                !this.keywords.some(k => k.id === keyword.id)
        );
        this.showSuggestions = this.suggestions.length > 0;
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    },
    selectSuggestion(suggestion) {
      this.inputValue = suggestion.name;
      this.addKeyword(); // 直接添加选中的建议
      this.suggestions = [];
      this.showSuggestions = false;
      this.$refs.keywordInput.blur();
      this.isInteractingWithSuggestions = false;
    },
  },
};
</script>
<style scoped>
.keyword-container {
  position: relative;
  font-family: system-ui, -apple-system, sans-serif;
}

.keyword-label {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  color: #2c3e50;
  margin-bottom: 8px;
  font-weight: 500;
}

.label-icon {
  margin-right: 8px;
  color: #34d399;
}

.input-wrapper {
  position: relative;
}

.keyword-input-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: 48px;
  padding: 6px 12px;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.keyword-input-container:focus-within {
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
}

.keyword-tag {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #60a5fa20, #34d39920);
  color: #3b82f6;
  padding: 4px 10px;
  border-radius: 20px;
  margin: 3px;
  font-size: 0.9rem;
  border: 1px solid #60a5fa40;
  transition: all 0.2s ease;
}

.keyword-tag:hover {
  background: linear-gradient(135deg, #60a5fa30, #34d39930);
  transform: translateY(-1px);
}

.remove-btn {
  margin-left: 6px;
  color: #ef4444;
  border: none;
  background: none;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0 2px;
  line-height: 1;
  opacity: 0.7;
  transition: all 0.2s ease;
}

.remove-btn:hover {
  opacity: 1;
  transform: scale(1.1);
}

.keyword-input {
  flex: 1;
  min-width: 120px;
  border: none;
  outline: none;
  font-size: 0.95rem;
  padding: 4px 8px;
  color: #1f2937;
}

.keyword-input::placeholder {
  color: #94a3b8;
}

.suggestions-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  padding: 6px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.suggestion-item {
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 8px;
  color: #4b5563;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.suggestion-item:hover {
  background: linear-gradient(135deg, #60a5fa10, #34d39910);
  color: #2563eb;
  transform: translateX(4px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.suggestions-list {
  animation: fadeIn 0.2s ease-out;
}
</style>