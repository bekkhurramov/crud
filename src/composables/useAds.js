import { ref, onMounted } from "vue"

export function useAds() {
    const ads = ref([])
    const loading = ref(false)
    const error = ref(null)

    const fetchAds = async () => {
        loading.value = true
        try {
            const res = await fetch("https://effective-mobile.duckdns.org/api/ads/")
            ads.value = await res.json()
        } catch (e) {
            error.value = "Xatolik"
        } finally {
            loading.value = false
        }
    }

    onMounted(fetchAds)

    return { ads, loading, error, fetchAds }
}

