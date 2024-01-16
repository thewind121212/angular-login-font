//generate navigate to right url
import { ActivatedRoute, Route, Router } from '@angular/router'
import { v4 as uuidv4 } from 'uuid'

export const  generateRegisterURl = (route: ActivatedRoute, router: Router): string  => {
    const uuidGenerate = uuidv4()
    const searchParams = route.snapshot.queryParams
    router.navigate([], {
        relativeTo: route,
        queryParams: { ...searchParams, uuid: uuidGenerate, register_step: 'signupForm' }
    })
    return uuidGenerate
}
