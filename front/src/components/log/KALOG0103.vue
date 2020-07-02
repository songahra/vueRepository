<template>
  <v-container
    fill-height
    style="max-width:450px;"
  >
    <v-layout
      align-center
      row
      wrap
    >
      <v-flex xs12>
        <v-form
          v-model="isFormValid"
          class="form"
          @submit.prevent="submitForm"
        >
          <div class="pa-3">
            <v-text-field
              v-model="user_id"
              solo
              outline
              :rules="emailRules"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-checkbox-blank-circle-outline'"
              label="이메일 입력"
              required
            />

            <v-text-field
              v-model="user_pw"
              solo
              outline
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.chk1, rules.chk2, rules.chk3, rules.min]"
              :min-rules="minRules.min"
              :type="show1 ? 'text' : 'password'"
              label="비밀번호 입력"
              counter
              @click:append="show1 = !show1"
            />
            <v-text-field
              v-model="user_pw2"
              solo
              outline
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              label="비밀번호 확인"
              :rules="pwdConfirm"
              :type="show2 ? 'text' : 'password'"
              @click:append="show2 = !show2"
            />
            <v-text-field
              v-model="user_name"
              solo
              outline
              :rules="nameRules"
              label="이름 입력"
              required
            />
            <v-text-field
              v-model="company"
              solo
              outline
              label="소속회사 입력"
              required
            />
            <v-text-field
              v-model="dept"
              solo
              outline
              label="부서 입력"
            />
            <v-container fluid>
              <v-row>
                <v-col cols="20">
                  <v-combobox
                    v-model="solution"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    placeholder="솔루션 선택"
                    clearable
                    outlined
                    dense
                    required
                    item-text="name"
                    item-value="code"
                  />
                </v-col>
              </v-row>
            </v-container>
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <v-combobox
                    v-model="user_type"
                    :items="items2"
                    :rules="[v => !!v || '담당을 선택하세요']"
                    placeholder="담당 선택"
                    clearable
                    outlined
                    dense
                    required
                    item-text="name"
                    item-value="code"
                  />
                </v-col>
              </v-row>
            </v-container>

            <div class="text-center">
              <v-btn
                :disabled="!isFormValid"
                large
                depressed
                type="submit"
              >
                회원가입
              </v-btn>
            </div>
          </div>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { signupUser } from '@/api/Signup.js'
export default {
  components: {

  },
  data () {
    return {
      isFormValid: false, // :rules 가 모두 ture여야 버튼 활성화
      name: '',
      nameRules: [
        v => !!v || '이름을 입력하세요!',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      user_id: '',
      emailRules: [
        v => !!v || '이메일을 입력하세요!',
        v => /.+@.+\..+/.test(v) || '이메일 형식이 올바르지 않습니다.'
      ],
      pwdConfirm: [v => !!v || 'Confirm password', v => v === this.user_pw || '비밀번호가 서로 일치하지 않습니다.'],
      user_pw2: '',
      show1: false,
      show2: false,
      user_pw: '',
      rules: {
        required: value => !!value || '비밀번호를 입력하세요!',
        min: v => v.length >= 10 || '10자 이상',
        chk1: v => /[A-Z]/.test(v) || '영어 대문자 포함',
        chk2: v => /[a-z]/.test(v) || '영어 소문자 포함',
        chk3: v => /[0-9]/.test(v) || '숫자 포함'
      },
      minRules: {
        min: v => v.length >= 10 || '10자 이상'
      },
      dept: null,
      user_type: null,
      items2: [
        {
          name: '답변자',
          code: 'A'
        },
        {
          name: '질문자',
          code: 'Q'
        }
      ],
      solution: null,
      items: [
        {
          name: 'iGate',
          code: 'SL010000'
        },
        {
          name: 'eCross',
          code: 'SL020000'
        },
        {
          name: 'Xtorm',
          code: 'SL030000'
        },
        {
          name: 'eXperDB',
          code: 'SL040000'
        },
        {
          name: 'Libeka',
          code: 'SL050000'
        },
        {
          name: 'iWorks',
          code: 'SL060000'
        },
        {
          name: 'iXeb',
          code: 'SL070000'
        },
        {
          name: 'APIM',
          code: 'SL080000'
        },
        {
          name: 'MyGuard',
          code: 'SL090000'
        },
        {
          name: '문서중앙화',
          code: 'SL100000'
        }
      ]
    }
  }, // data
  methods: {
    // 회원가입
    async submitForm () {
      try {
        // 비즈니스 로직
        const userData = {
          user_id: this.user_id,
          user_name: this.user_name,
          user_pw: this.user_pw,
          company: this.company,
          user_type: this.user_type.code,
          solution: this.solution.code,
          dept: this.dept

        }
        console.log(userData)
        const res = await signupUser(userData)
        if (res.status === 200) {
          alert(res.data)
          this.$router.push('/login')
        } else {
          alert('회원가입 실패')
          this.$router.push('/login')
        }
      } catch (error) {

      } finally {

      }
    }
  }
}
</script>

<style>

</style>
