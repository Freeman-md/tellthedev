import { useSupabaseUser } from '#imports'
import { ProfileService } from '@/services/profile-service'

export const useProfile = () => {
    const profileService = new ProfileService()
    const user = useSupabaseUser()

    const getProfile = async () => {
        if (!user.value) throw new Error('Not authenticated')
        return await profileService.getProfile(user.value.id)
    }

    const completeOnboarding = async () => {
        if (!user.value) throw new Error('Not authenticated')
        return await profileService.markOnboardingComplete(user.value.id)
    }

    return {
        getProfile,
        completeOnboarding,
    }
}
