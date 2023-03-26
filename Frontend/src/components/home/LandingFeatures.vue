<template>
     <section class="bg-white dark:bg-gray-900">
    <div class="container px-6 py-10 mb-10 mx-auto">
        <h1 class="text-2xl font-semibold text-gray-800  lg:text-3xl dark:text-white">{{ $t("landigfeatures.featuretitle1") }}  <span class="underline decoration-blue-500">{{ $t("landigfeatures.featuretitle2") }} </span></h1>


        <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
            <div class="p-8 space-y-3 border-2 border-rose-400 dark:border-rose-300 rounded-xl hover:bg-rose-100 transition-all duration-200">
                <span class="inline-block text-rose-500 dark:text-rose-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                    </svg>
                </span>

                <h1 class="text-xl font-semibold text-gray-700  dark:text-white">{{ $t("landigfeatures.feature1") }} </h1>

                <p class="text-gray-500 dark:text-gray-300">
                    {{ $t("landigfeatures.featurea") }}
                </p>

            </div>

            <div class="p-8 space-y-3 border-2 border-purple-400 dark:border-purple-300 rounded-xl hover:bg-purple-100 transition-all duration-200">
                <span class="inline-block text-purple-500 dark:text-purple-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                </span>

                <h1 class="text-xl font-semibold text-gray-700  dark:text-white">{{ $t("landigfeatures.feature2") }}</h1>

                <p class="text-gray-500 dark:text-gray-300">
                  {{ $t("landigfeatures.featureb") }}
                </p>
            </div>

            <div class="p-8 space-y-3 border-2 border-yellow-400 dark:border-yellow-300 rounded-xl hover:bg-yellow-100 transition-all duration-200">
                <span class="inline-block text-yellow-500 dark:text-yellow-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                </span>

                <h1 class="text-xl font-semibold text-gray-700  dark:text-white">{{ $t("landigfeatures.feature3") }}</h1>

                <p class="text-gray-500 dark:text-gray-300">
                  {{ $t("landigfeatures.featurec") }}
                </p>

            </div>
        </div>
    </div>
    <div class="blob"/>
    
</section>
</template>

<style>


.blob { 
    position: absolute;
    height: 100%;
    right: 0%;
    height: 180%;
    width: 4%;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns=%22http:%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width=%22755.906%22 height=%22652.328%22 viewBox=%22106.719 156.091 755.906 652.328%22%3E%3Cdefs%3E%3ClinearGradient id=%22b%22 gradientTransform=%22rotate(-45 .5 .5)%22%3E%3Cstop offset=%220%25%22 stop-color=%22%23FEE140%22%2F%3E%3Cstop offset=%22100%25%22 stop-color=%22%23FA709A%22%2F%3E%3C%2FlinearGradient%3E%3CclipPath id=%22a%22%3E%3Cpath fill=%22currentColor%22 d=%22M804 617.5Q687 735 554 789.5t-237.5-48Q212 639 131.5 461.5t100.5-261q181-83.5 318.5-10t254 191.5Q921 500 804 617.5Z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg clip-path=%22url(%23a)%22%3E%3Cpath fill=%22url(%23b)%22 d=%22M804 617.5Q687 735 554 789.5t-237.5-48Q212 639 131.5 461.5t100.5-261q181-83.5 318.5-10t254 191.5Q921 500 804 617.5Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
}




</style>