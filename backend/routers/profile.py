from fastapi import APIRouter, HTTPException, Depends, Response
from routers.auth import get_current_user
from routers.users import User

import db
from typing import Annotated
from models.requests import BragProfile, BragProfileBase
from sqlmodel import select

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.put("/")
def create_brag_profile(profile: BragProfileBase, db: db.SessionDep, 
    current_user: Annotated[User, Depends(get_current_user)]) -> BragProfileBase:
    '''Creates a user profile'''
    user_profile = db.exec(select(BragProfile).where(BragProfile.user_id == current_user.id)).first()

    # create it
    if not user_profile: 
        user_profile = BragProfile(
            user_id=current_user.id,
            bio=profile.bio, 
            proudest_achievement=profile.proudest_achievement, 
            challenge_overcome=profile.challenge_overcome,
            leadership_example=profile.leadership_example
        )

        db.add(user_profile)
    else:
        # only update values that aren't None, allows frontend to reduce amt of data sent
        update_values = profile.model_dump(exclude_none=True)
        # update each attr
        for k, v in update_values.items():
            setattr(user_profile, k, v)

        db.add(user_profile)

    db.commit()
    db.refresh(user_profile)
    return user_profile

@router.get("/")
def get_brag_profile(db: db.SessionDep, 
    current_user: Annotated[User, Depends(get_current_user)]) -> BragProfileBase: 
    '''Gets the profile if it exists'''
    user_profile = db.exec(select(BragProfile).where(BragProfile.user_id == current_user.id)).first()
    if not user_profile: 
        return Response(status_code=204)

    return user_profile